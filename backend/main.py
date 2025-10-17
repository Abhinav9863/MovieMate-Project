from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the MovieMate API!"}

@app.post("/media/", response_model=schemas.MediaItem)
def create_media_item(item: schemas.MediaItemCreate, db: Session = Depends(get_db)):
    db_item = models.MediaItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/media/", response_model=List[schemas.MediaItem])
def read_media_items(db: Session = Depends(get_db)):
    items = db.query(models.MediaItem).all()
    return items

@app.get("/media/{item_id}", response_model=schemas.MediaItem)
def read_media_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.MediaItem).filter(models.MediaItem.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Media item not found")
    return item

@app.put("/media/{item_id}", response_model=schemas.MediaItem)
def update_media_item(item_id: int, item_update: schemas.MediaItemCreate, db: Session = Depends(get_db)):
    db_item = db.query(models.MediaItem).filter(models.MediaItem.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Media item not found")
        
    for key, value in item_update.model_dump().items():
        setattr(db_item, key, value)
        
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/media/{item_id}", status_code=204)
def delete_media_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.MediaItem).filter(models.MediaItem.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Media item not found")
        
    db.delete(db_item)
    db.commit()
    return
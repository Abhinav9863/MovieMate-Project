import os
import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List ,Optional
import models
import schemas
from models import Status, Platform
from database import SessionLocal, engine

load_dotenv()
TMDB_API_KEY = os.getenv("TMDB_API_KEY")

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173", # The origin of your React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/search/")
async def search_tmdb(query: str):

    if not TMDB_API_KEY:
        raise HTTPException(status_code=500, detail="TMDB API key not configured")

    search_url = f"https://api.themoviedb.org/3/search/multi?query={query}&api_key={TMDB_API_KEY}"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(search_url)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="Error from TMDB")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

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
def read_media_items(
    status: Optional[Status] = None,
    platform: Optional[Platform] = None,
    genre: Optional[str] = None,
    sort_by: Optional[str] = None,
    order: Optional[str] = None,
    search: Optional[str] = None, # <-- ADD SEARCH PARAM
    db: Session = Depends(get_db)
):
    query = db.query(models.MediaItem)

    # Filtering
    if status:
        query = query.filter(models.MediaItem.status == status)
    if platform:
        query = query.filter(models.MediaItem.platform == platform)
    if genre:
        query = query.filter(models.MediaItem.genre.ilike(f"%{genre}%"))

    # --- ADD SEARCH FILTER ---
    if search:
        query = query.filter(models.MediaItem.title.ilike(f"%{search}%")) # Search in title

    # Sorting
    if sort_by:
        sort_column = getattr(models.MediaItem, sort_by, None)
        if sort_column:
            if order and order.lower() == "desc":
                query = query.order_by(sort_column.desc())
            else:
                query = query.order_by(sort_column.asc())

    items = query.all()
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
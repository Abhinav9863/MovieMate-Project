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

# --- API Endpoints ---

@app.get("/")
def read_root():
\
    return {"message": "Welcome to the MovieMate API!"}


@app.post("/movies/", response_model=schemas.Movie)
def create_movie(movie: schemas.MovieCreate, db: Session = Depends(get_db)):

    db_movie = models.Movie(**movie.model_dump())
    
    db.add(db_movie)
    
    db.commit()
    
    db.refresh(db_movie)
    
    return db_movie

@app.get("/movies/", response_model=List[schemas.Movie])
def read_movies(db: Session = Depends(get_db)):

    movies = db.query(models.Movie).all()
    return movies
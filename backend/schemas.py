from pydantic import BaseModel
from models import Status, Platform  # Import the Enums


class MovieBase(BaseModel):
    title: str
    director: str
    genre: str
    platform: Platform
    status: Status


class MovieCreate(MovieBase):
    pass 
class Movie(MovieBase):
    id: int  


    class Config:
        orm_mode = True
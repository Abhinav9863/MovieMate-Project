from pydantic import BaseModel, ConfigDict
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

    model_config = ConfigDict(from_attributes=True)
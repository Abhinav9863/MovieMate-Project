import enum
from sqlalchemy import Column, Integer, String
from database import Base

class Status(str, enum.Enum):
    watching = "watching"
    completed = "completed"
    wishlist = "wishlist"

class Platform(str, enum.Enum):
    netflix = "Netflix"
    prime = "Prime"
    other = "Other"

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    director = Column(String)
    genre = Column(String)
    
    platform = Column(String, default=Platform.other)
    status = Column(String, default=Status.wishlist)
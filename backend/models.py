import enum
from sqlalchemy import Column, Integer, String, Enum as SAEnum, Text, Float
from database import Base

class Status(str, enum.Enum):
    watching = "watching"
    completed = "completed"
    wishlist = "wishlist"

class Platform(str, enum.Enum):
    netflix = "Netflix"
    prime = "Prime"
    other = "Other"

class ItemType(str, enum.Enum):
    movie = "movie"
    tv_show = "tv_show"

class MediaItem(Base):
    __tablename__ = "media_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    director = Column(String, nullable=True) # Director is optional
    genre = Column(String)
    platform = Column(String) 
    status = Column(String) 
    
    # --- NEW FIELDS ---
    item_type = Column(SAEnum(ItemType), default=ItemType.movie)
    episodes_watched = Column(Integer, default=0)
    rating = Column(Float, nullable=True) # e.g., 8.5
    review = Column(Text, nullable=True) # Longer text field
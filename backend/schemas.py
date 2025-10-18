from pydantic import BaseModel, ConfigDict
from models import Status, Platform, ItemType
from typing import Optional

class MediaItemBase(BaseModel):
    title: str
    director: Optional[str] = None 
    genre: str
    platform: Platform
    status: Status
    item_type: ItemType
    episodes_watched: Optional[int] = 0
    rating: Optional[float] = None
    review: Optional[str] = None

class MediaItemCreate(MediaItemBase):
    pass

class MediaItem(MediaItemBase):
    id: int
    
    model_config = ConfigDict(from_attributes=True)
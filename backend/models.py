from sqlalchemy import Column, Integer, String, Enum
from database import Base  # Import the Base from database.py

# We create an Enum here to restrict the 'status' field
# to only these values. This is great for data integrity.
class Status(str, Enum):
    watching = "watching"
    completed = "completed"
    wishlist = "wishlist"

class Platform(str, Enum):
    netflix = "Netflix"
    prime = "Prime"
    other = "Other"

# This is your database table model
class Movie(Base):
    __tablename__ = "movies"  # The actual table name in the DB

    # These are the columns
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    director = Column(String)
    genre = Column(String)
    
    # We use the Enum for these columns
    platform = Column(String, default=Platform.other)
    status = Column(String, default=Status.wishlist)
    
 
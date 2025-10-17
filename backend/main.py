from fastapi import FastAPI
import models
from  database import engine

models.Base.metadata.create_all(bind=engine)

# 1. This creates the main "app" object for your project.
app = FastAPI()
# 2. This defines a simple route that responds to GET requests at the root URL ("/").
@app.get("/")
def read_root():

    return {"message": "Hello! This is the MovieMate backend."}


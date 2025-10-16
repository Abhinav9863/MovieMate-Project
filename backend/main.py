from fastapi import FastAPI

# 1. This creates the main "app" object for your project.
#    It's the central point that will manage all your API routes.
app = FastAPI()


# 2. This is a "path operation decorator."
#    @app.get: Tells FastAPI that the function below it handles
#               HTTP GET requests.
#    "/":       Specifies the URL *path*. This is the root or
#               "homepage" of your API.
@app.get("/")
def read_root():
    # 3. This is the content that gets sent back.
    #    FastAPI will automatically convert this Python dictionary
    #    into the correct JSON format that browsers and
    #    frontends understand.
    return {"message": "Hello! This is the MovieMate backend."}
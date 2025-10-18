# MovieMate: Full-Stack Media Tracker

This is a full-stack application submitted for the SayOne Technologies hiring task. It's a personal media tracker for movies and TV shows, built with React (Vite), FastAPI (Python), and SQLAlchemy/SQLite.

**Link to Live Demo Video:** [YOUR 2-3 MINUTE VIDEO LINK GOES HERE - Important!]

---

## Features

* **Full-Stack CRUD:** Create, Read, Update, and Delete all media items (Movies & TV Shows).
* **Detailed Tracking:** Tracks title, director, genre, platform, status, episodes watched, rating, and reviews.
* **Dynamic Frontend:** A clean, responsive UI built with React and Chakra UI.
* **Routing:** Multi-page app (Homepage, Add, Edit, Details) using React Router.
* **Filtering & Sorting:** The main list can be dynamically filtered by status, platform, or genre (backend) and sorted by title, rating, or date added (frontend).
* **Search:** Real-time search by title on the main list.
* **TMDB Integration:** Auto-fill item details (title, type, rating, review) when adding new media using the TMDB API search.
* **Data Visualization:** A simple bar chart showing the count of items by status.
* **Interactive API Docs:** Backend includes automatic API documentation via FastAPI (`/docs`).

---

## Tech Stack

* **Frontend:** React (with Vite), React Router, Chakra UI, Axios, Recharts
* **Backend:** FastAPI (Python), SQLAlchemy, Uvicorn, python-dotenv, httpx
* **Database:** SQLite

---

## Setup and Installation

To run this project locally, you will need two terminals.

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  *(Optional but Recommended)* Create a `.env` file in the `backend` folder and add your TMDB API key:
    ```
    TMDB_API_KEY=your_key_here
    ```
5.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
* The backend will be running at `http://127.0.0.1:8000`.
* API docs are at `http://127.0.0.1:8000/docs`.

### Frontend Setup

1.  In a separate terminal, navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the app:
    ```bash
    npm run dev
    ```
* The app will be running at `http://localhost:5173` (or a similar port). Ensure the backend is running for the app to fetch data.

---

## Deployment Note

The frontend is deployed live on Vercel:https://movie-mate-project.vercel.app/


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="UrbanFlow AI API",
    description="AI-Powered Fleet Traffic Intelligence Platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "project": "UrbanFlow AI",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    return {
        "project": "UrbanFlow AI",
        "status": "running"
    }
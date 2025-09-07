import uuid
from typing import Optional
from fastapi import APIRouter, HTTPException, Cookie, Depends
from sqlalchemy.orm import Session

from db.database import get_db
from models.job import StoryJob
from schemas.job import StoryJobResponse

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"],
)

@router.get("/{job_id}", response_model=StoryJobResponse)
def get_job_status(job_id: str, db: Session = Depends(get_db), session_id: Optional[str] = Cookie(None)):
    if session_id is None:
        raise HTTPException(status_code=400, detail="Session ID cookie is missing")

    job = db.query(StoryJob).filter(StoryJob.job_id == job_id, StoryJob.session_id == session_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job
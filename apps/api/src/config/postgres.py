from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import Generator

Engine = None
SessionLocal = None
Base = None

def init_postgres(db_url: str) -> None:
    global engine, SessionLocal, Base

    Engine = create_engine(db_url, echo=True)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base = declarative_base()

def get_db() -> Generator:
    if SessionLocal is None:
        raise RuntimeError("Database not initialized. Call init_postgres first.")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
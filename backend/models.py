from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, index=True)
    name = Column(String)
    event_type = Column(String, index=True)
    country = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    event_date = Column(DateTime, index=True)
    source_url = Column(String)
    mention_count = Column(Integer, default=0)
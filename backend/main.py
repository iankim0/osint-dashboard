from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine, get_db
from datetime import datetime
import models, fetcher 

models.Base.metadata.create_all(bind=engine)

app=FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['*'],
                   allow_methods=['*'], allow_headers=['*'])

@app.get('/api/events')
async def get_events(
    country: str = None,
    event_type: str = None,
    start_date: str = None,
    end_date: str = None,
    db = Depends(get_db)
):
    query = db.query(models.Event)
    if country:
        query = query.filter(models.Event.country == country)
    if event_type:
        query = query.filter(models.Event.event_type == event_type)
    if start_date:
        start = datetime.strptime(start_date, '%Y-%m-%d')
        query = query.filter(models.Event.event_date >= start)
    if end_date:
        end = datetime.strptime(end_date, '%Y-%m-%d')
        query = query.filter(models.Event.event_date <= end)
    events = query.all()
    return [
        {
            'url': e.url,
            'name': e.name,
            'event_type': e.event_type,
            'country': e.country,
            'latitude': e.latitude, 
            'longitude': e.longitude,
            'event_date': str(e.event_date),
            'source_url': e.source_url,
            'mention_count': e.mention_count,
        }
        for e in events
    ]

@app.post('/api/refresh')
async def refresh_data(db = Depends(get_db)):
    count = await fetcher.fetch_gdelt_events(db)
    return {'message': f'Fetcher {count} events'}

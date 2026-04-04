import httpx
from datetime import datetime 
from models import Event

GDELT_DOC_URL = 'https://api.gdeltproject.org/api/v2/doc/doc'

COUNTRY_COORDS = {
    'United States': (39.8, -98.5),
    'United Kingdom': (55.3, -3.4),
    'Ukraine': (48.3, 31.1),
    'Russia': (61.5, 105.3),
    'China': (35.8, 104.1),
    'India': (20.5, 78.9),
    'Serbia': (44.0, 21.0),
    'South Korea': (35.9, 127.7),
    'Indonesia': (-0.7, 113.9),
    'France': (46.2, 2.2),
    'Germany': (51.1, 10.4),
    'Israel': (31.0, 34.8),
    'Syria': (34.8, 38.9),
    'Iraq': (33.2, 43.6),
    'Nigeria': (9.0, 8.6),
    'Brazil': (-14.2, -51.9),
    'Mexico': (23.6, -102.5),
    'Japan': (36.2, 138.2),
    'Turkey': (38.9, 35.2),
    'Egypt': (26.8, 30.8),
}

async def fetch_gdelt_events(db, limit=250):
    params = {
        'query': '(conflict OR protest OR violence)',
        'mode': 'artlist',
        'maxrecords': limit,
        'format': 'json',
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(GDELT_DOC_URL, params=params)
        print("Status:", response.status_code)
        print("URL:", response.url)
        print("Response:", response.text[:500])
        data = response.json()

    for article in data.get('articles', []):
        country = article.get('sourcecountry', '')
        coords = COUNTRY_COORDS.get(country, (0.0, 0.0))

        event = Event(
            url=article.get('url'),
            name=article.get('title'),
            longitude=coords[1],
            latitude=coords[0],
            source_url=article.get('url'),
            mention_count=1,
            event_type='conflict',
            event_date=datetime.strptime(article.get('seendate', ''), '%Y%m%dT%H%M%SZ') if article.get('seendate') else datetime.utcnow(),
            country=country,
        )
        db.merge(event)
    
    db.commit()
    return len(data.get('articles', []))
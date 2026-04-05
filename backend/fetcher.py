import httpx
import random
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
    'Canada': (56.1, -106.3),
    'Australia': (-25.2, 133.7),
    'South Africa': (-30.5, 22.9),
    'Pakistan': (30.3, 69.3),
    'Afghanistan': (33.9, 67.7),
    'Iran': (32.4, 53.6),
    'Saudi Arabia': (23.8, 45.0),
    'Yemen': (15.5, 48.5),
    'Ethiopia': (9.1, 40.4),
    'Kenya': (-0.02, 37.9),
    'Colombia': (4.5, -74.2),
    'Venezuela': (6.4, -66.5),
    'Argentina': (-38.4, -63.6),
    'Peru': (-9.1, -75.0),
    'Chile': (-35.6, -71.5),
    'Poland': (51.9, 19.1),
    'Italy': (41.8, 12.5),
    'Spain': (40.4, -3.7),
    'Netherlands': (52.1, 5.2),
    'Belgium': (50.5, 4.4),
    'Sweden': (60.1, 18.6),
    'Norway': (60.4, 8.4),
    'Denmark': (56.2, 9.5),
    'Finland': (61.9, 25.7),
    'Greece': (39.0, 21.8),
    'Romania': (45.9, 24.9),
    'Hungary': (47.1, 19.5),
    'Czech Republic': (49.8, 15.4),
    'Austria': (47.5, 14.5),
    'Switzerland': (46.8, 8.2),
    'Portugal': (39.3, -8.2),
    'Ireland': (53.1, -7.6),
    'Philippines': (12.8, 121.7),
    'Thailand': (15.8, 100.9),
    'Vietnam': (14.0, 108.2),
    'Myanmar': (21.9, 95.9),
    'Malaysia': (4.2, 101.9),
    'Singapore': (1.3, 103.8),
    'Taiwan': (23.6, 120.9),
    'Bangladesh': (23.6, 90.3),
    'Sri Lanka': (7.8, 80.7),
    'Nepal': (28.3, 84.1),
    'Somalia': (5.1, 46.1),
    'Sudan': (12.8, 30.2),
    'South Sudan': (6.8, 31.3),
    'Libya': (26.3, 17.2),
    'Tunisia': (33.8, 9.5),
    'Morocco': (31.7, -7.0),
    'Algeria': (28.0, 1.6),
    'Ghana': (7.9, -1.0),
    'Cameroon': (7.3, 12.3),
    'Congo': (-4.0, 21.7),
    'Democratic Republic of Congo': (-4.0, 21.7),
    'Uganda': (1.3, 32.2),
    'Tanzania': (-6.3, 34.8),
    'Mozambique': (-18.6, 35.5),
    'Zimbabwe': (-19.0, 29.1),
    'Angola': (-11.2, 17.8),
    'Lebanon': (33.8, 35.8),
    'Jordan': (30.5, 36.2),
    'Palestine': (31.9, 35.2),
    'Georgia': (42.3, 43.3),
    'Armenia': (40.0, 45.0),
    'Azerbaijan': (40.1, 47.5),
    'Kazakhstan': (48.0, 66.9),
    'Uzbekistan': (41.3, 64.5),
    'New Zealand': (-40.9, 174.8),
    'Cuba': (21.5, -77.7),
    'Haiti': (18.9, -72.2),
    'Honduras': (15.1, -86.2),
    'Guatemala': (15.7, -90.2),
    'El Salvador': (13.7, -88.8),
    'Nicaragua': (12.8, -85.2),
    'Panama': (8.5, -80.7),
    'Costa Rica': (9.7, -83.7),
    'Jamaica': (18.1, -77.2),
    'Dominican Republic': (18.7, -70.1),
    'Bolivia': (-16.2, -63.5),
    'Ecuador': (-1.8, -78.1),
    'Paraguay': (-23.4, -58.4),
    'Uruguay': (-32.5, -55.7),
    'Albania': (41.1, 20.1),
    'North Macedonia': (41.5, 21.7),
    'Bosnia and Herzegovina': (43.9, 17.6),
    'Croatia': (45.1, 15.9),
    'Slovenia': (46.1, 14.9),
    'Slovakia': (48.6, 19.6),
    'Lithuania': (55.1, 23.8),
    'Latvia': (56.8, 24.3),
    'Estonia': (58.5, 25.0),
    'Moldova': (47.4, 28.3),
    'Belarus': (53.7, 27.9),
    'North Korea': (40.3, 127.5),
    'Mongolia': (46.8, 103.8),
    'Cambodia': (12.5, 104.9),
    'Laos': (19.8, 102.4),
}

def classify_event(title):
    title_lower = title.lower()
    if any(word in title_lower for word in ['protest', 'demonstrat', 'rally', 'march']):
        return 'Protests'
    if any(word in title_lower for word in ['riot', 'unrest', 'loot']):
        return 'Riots'
    if any(word in title_lower for word in ['battle', 'offensive', 'military', 'troops', 'airstrike', 'bomb']):
        return 'Battles'
    if any(word in title_lower for word in ['killed', 'murder', 'massacre', 'civilian', 'attack']):
        return 'Violence against civilians'
    return 'Other'

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
        if country not in COUNTRY_COORDS:
            continue
        base_coords = COUNTRY_COORDS[country]
        lat = base_coords[0] + random.uniform(-2.0, 2.0)
        lng = base_coords[1] + random.uniform(-2.0, 2.0)

        event = Event(
            url=article.get('url'),
            name=article.get('title'),
            longitude=lng,
            latitude=lat,
            source_url=article.get('url'),
            mention_count=1, 
            event_type=classify_event(article.get('title', '')),
            event_date=datetime.strptime(article.get('seendate', ''), '%Y%m%dT%H%M%SZ') if article.get('seendate') else datetime.utcnow(),
            country=country,
        )
        existing = db.query(Event).filter(Event.url == article.get('url')).first()
        if existing:
            continue
        db.add(event)
    
    db.commit()
    return len(data.get('articles', []))
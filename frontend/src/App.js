import { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './components/Map';
import Globe from './components/Globe';
import FilterPanel from './components/FilterPanel';

function App() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [viewMode, setViewMode] = useState('map');
    const [filters, setFilters] = useState({
        country: '',
        eventType: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        const params = {};
        if (filters.country) params.country = filters.country;
        if (filters.eventType) params.event_type = filters.eventType;
        if (filters.startDate) params.start_date = filters.startDate;
        if (filters.endDate) params.end_date = filters.endDate;

        axios.get('https://osint-dashboard-9c5n.onrender.com', { params })
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, [filters]);

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            {viewMode === 'map' ? (
                <Map events={events} />
            ) : (
                <Globe events={events} onEventClick={setSelectedEvent} />
            )}
            <FilterPanel filters={filters} onChange={setFilters} />
            <button
                onClick={() => setViewMode(viewMode === 'map' ? 'globe' : 'map')}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 1000,
                    padding: '10px 18px',
                    backgroundColor: 'rgba(17, 24, 39, 0.92)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    border: '1px solid rgba(75,85,99,0.5)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                }}
            >
                {viewMode === 'map' ? '🌐 Globe View' : '🗺️ Map View'}
            </button>

            {selectedEvent && viewMode === 'globe' && (
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    right: '20px',
                    zIndex: 1000,
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    width: '280px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}>
                    <button onClick={() => setSelectedEvent(null)} style={{
                        background: 'none', border: 'none', color: '#9CA3AF',
                        cursor: 'pointer', fontSize: '14px', float: 'right',
                    }}>✕</button>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 6px 0' }}>{selectedEvent.name}</h3>
                    <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '0 0 8px 0' }}>{selectedEvent.event_date}</p>
                    <p style={{ fontSize: '13px', margin: '2px 0' }}><strong>Country:</strong> {selectedEvent.country}</p>
                    <p style={{ fontSize: '13px', margin: '2px 0' }}><strong>Type:</strong> {selectedEvent.event_type}</p>
                    {selectedEvent.source_url && (
                        <a href={selectedEvent.source_url} target='_blank' rel='noreferrer'
                            style={{ fontSize: '12px', color: '#60A5FA', display: 'block', marginTop: '8px' }}>
                            View Source →
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
import { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './components/Map';
import FilterPanel from './components/FilterPanel';
import EventSidebar from './components/EventSidebar';

function App() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
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

        axios.get('http://localhost:8000/api/events', { params })
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, [filters]);

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <Map events={events} onEventClick={setSelectedEvent} />
            <FilterPanel filters={filters} onChange={setFilters} />
            <EventSidebar event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        </div>
    );
}

export default App;
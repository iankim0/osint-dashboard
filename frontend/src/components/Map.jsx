import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const EVENT_COLORS = {
    'Battles': '#DC2626',
    'Protests': '#D97706',
    'Riots': '#7C3AED',
    'Violence against civilians': '#DB2777',
    'default': '#2563EB'
};

export default function Map({ events, onEventClick }) {
    return (
        <MapContainer 
            center={ [20, 0] } 
            zoom={ 3 } 
            style={{ height: '100vh', width: '100%' }}
            maxBounds={[[-90, -180], [90, 180]]}
            maxBoundsViscosity={1.0}
            minZoom={2}
        >
            <TileLayer url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' />
            {events.map(event => (
                <CircleMarker
                    key={event.url}
                    center={[event.latitude, event.longitude]}
                    radius={Math.max(4, Math.min(event.mention_count, 20))}
                    color={EVENT_COLORS[event.event_type] || EVENT_COLORS.default}
                    eventHandlers={{ click: () => onEventClick(event) }}
                >
                    <Popup>{event.event_type} - {event.country}</Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
}
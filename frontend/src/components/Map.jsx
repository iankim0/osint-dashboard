import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../popup.css';

const EVENT_COLORS = {
    'Battles': '#DC2626',
    'Protests': '#D97706',
    'Riots': '#7C3AED',
    'Violence against civilians': '#DB2777',
    'Other': '#2563EB',
    'conflict': '#2563EB',
    'default': '#2563EB'
};

export default function Map({ events }) {
    return (
        <MapContainer center={[20, 0]} zoom={3} style={{ height: '100vh', width: '100%' }}
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
                >
                    <Popup>
                        <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", maxWidth: '250px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 6px 0' }}>{event.name}</h3>
                            <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>{event.event_date}</p>
                            <p style={{ fontSize: '13px', margin: '2px 0' }}><strong>Country:</strong> {event.country}</p>
                            <p style={{ fontSize: '13px', margin: '2px 0' }}><strong>Type:</strong> {event.event_type}</p>
                            {event.source_url && (
                                <a href={event.source_url} target='_blank' rel='noreferrer'
                                    style={{ fontSize: '12px', color: '#3B82F6', display: 'block', marginTop: '8px' }}>
                                    View Source →
                                </a>
                            )}
                        </div>
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
}
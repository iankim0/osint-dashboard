export default function EventSidebar({ event, onClose }) {
    if (!event) return null;
    return (
        <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: '320px',
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            backdropFilter: 'blur(8px)',
            color: 'white',
            padding: '24px',
            boxShadow: '-4px 0 20px rgba(0,0,0,0.4)',
            zIndex: 1000,
            fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: '14px', marginBottom: '16px' }}>✕ Close</button>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{event.name}</h2>
            <p style={{ color: '#9CA3AF', fontSize: '13px', marginTop: '4px' }}>{event.event_date}</p>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p><span style={{ color: '#9CA3AF' }}>Country:</span> {event.country}</p>
                <p><span style={{ color: '#9CA3AF' }}>Type:</span> {event.event_type}</p>
                <p><span style={{ color: '#9CA3AF' }}>Mentions:</span> {event.mention_count}</p>
            </div>
            {event.source_url && (
                <a href={event.source_url} target='_blank' rel='noreferrer'
                    style={{ marginTop: '16px', display: 'block', color: '#60A5FA', textDecoration: 'underline', fontSize: '13px' }}>
                    View Source
                </a>
            )}
        </div>
    );
}
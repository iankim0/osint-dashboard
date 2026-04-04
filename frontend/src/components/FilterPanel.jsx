export default function FilterPanel({ filters, onChange }) {
    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            backgroundColor: 'rgba(17, 24, 39, 0.92)',
            backdropFilter: 'blur(8px)',
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            width: '240px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.5px' }}>
                FILTERS
            </h2>
            <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Country</label>
                <input
                    style={{ width: '100%', boxSizing: 'border-box', marginTop: '4px', padding: '8px 10px', backgroundColor: 'rgba(55,65,81,0.7)', border: '1px solid rgba(75,85,99,0.5)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none' }}
                    value={filters.country}
                    onChange={e => onChange({ ...filters, country: e.target.value })}
                    placeholder='e.g. Ukraine'
                />
            </div>
            <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Event Type</label>
                <select
                    style={{ width: '100%', boxSizing: 'border-box', marginTop: '4px', padding: '8px 10px', backgroundColor: 'rgba(55,65,81,0.7)', border: '1px solid rgba(75,85,99,0.5)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none' }}
                    value={filters.eventType}
                    onChange={e => onChange({ ...filters, eventType: e.target.value })}
                >
                    <option value=''>All Types</option>
                    <option>Battles</option>
                    <option>Protests</option>
                    <option>Riots</option>
                    <option>Violence against civilians</option>
                </select>
            </div>
            <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Start Date</label>
                <input type='date'
                    style={{ width: '100%', boxSizing: 'border-box', marginTop: '4px', padding: '8px 10px', backgroundColor: 'rgba(55,65,81,0.7)', border: '1px solid rgba(75,85,99,0.5)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none' }}
                    value={filters.startDate}
                    onChange={e => onChange({ ...filters, startDate: e.target.value })}
                />
            </div>
            <div style={{ marginBottom: '0' }}>
                <label style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>End Date</label>
                <input type='date'
                    style={{ width: '100%', boxSizing: 'border-box', marginTop: '4px', padding: '8px 10px', backgroundColor: 'rgba(55,65,81,0.7)', border: '1px solid rgba(75,85,99,0.5)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none' }}
                    value={filters.endDate}
                    onChange={e => onChange({ ...filters, endDate: e.target.value })}
                />
            </div>
        </div>
    );
}
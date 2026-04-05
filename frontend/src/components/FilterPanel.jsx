import { useState, useRef } from 'react';

export default function FilterPanel({ filters, onChange }) {
    const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 400 });
    const [dragging, setDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
        setDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        setPosition({
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y,
        });
    };

    const handleMouseUp = () => {
        setDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                zIndex: 1000,
                backgroundColor: 'rgba(17, 24, 39, 0.92)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '20px',
                borderRadius: '12px',
                width: '240px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                cursor: dragging ? 'grabbing' : 'grab',
                userSelect: 'none',
            }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.5px' }}>
                FILTERS
            </h2>
            <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Country</label>
                <input
                    style={{ width: '100%', boxSizing: 'border-box', marginTop: '4px', padding: '8px 10px', backgroundColor: 'rgba(55,65,81,0.7)', border: '1px solid rgba(75,85,99,0.5)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', cursor: 'text' }}
                    value={filters.country}
                    onChange={e => onChange({ ...filters, country: e.target.value })}
                    placeholder='e.g. Ukraine'
                />
            </div>
            <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>Event Type</label>
                <select
                    style={{ width: '100%', boxSizing: 'border-box', marginTop: '4px', padding: '8px 10px', backgroundColor: 'rgba(55,65,81,0.7)', border: '1px solid rgba(75,85,99,0.5)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
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
                    style={{ width: '100%', boxSizing: 'border-box', marginTop: '4px', padding: '8px 10px', backgroundColor: 'rgba(55,65,81,0.7)', border: '1px solid rgba(75,85,99,0.5)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
                    value={filters.startDate}
                    onChange={e => onChange({ ...filters, startDate: e.target.value })}
                />
            </div>
            <div style={{ marginBottom: '0' }}>
                <label style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>End Date</label>
                <input type='date'
                    style={{ width: '100%', boxSizing: 'border-box', marginTop: '4px', padding: '8px 10px', backgroundColor: 'rgba(55,65,81,0.7)', border: '1px solid rgba(75,85,99,0.5)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
                    value={filters.endDate}
                    onChange={e => onChange({ ...filters, endDate: e.target.value })}
                />
            </div>
        </div>
    );
}
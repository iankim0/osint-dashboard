import GlobeGL from 'react-globe.gl';
import { useRef, useEffect, useState } from 'react';

const EVENT_COLORS = {
    'Battles': '#DC2626',
    'Protests': '#D97706',
    'Riots': '#7C3AED',
    'Violence against civilians': '#DB2777',
    'Other': '#2563EB',
    'conflict': '#2563EB',
};

export default function Globe({ events, onEventClick }) {
    const globeRef = useRef();
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <GlobeGL
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pointsData={events}
            pointLat={d => d.latitude}
            pointLng={d => d.longitude}
            pointColor={d => EVENT_COLORS[d.event_type] || '#2563EB'}
            pointRadius={0.4}
            pointAltitude={0.01}
            onPointClick={onEventClick}
            pointLabel={d => `${d.name} — ${d.country}`}
            width={dimensions.width}
            height={dimensions.height}
            atmosphereColor="#3B82F6"
            atmosphereAltitude={0.15}
        />
    );
}
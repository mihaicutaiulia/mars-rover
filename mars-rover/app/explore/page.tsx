'use client';

import { useEffect, useState } from 'react';

export default function ExplorePage() {
    const [photos, setPhotos] = useState<any[]>([]);
    const [earthDate, setEarthDate] = useState('2020-07-13');

    useEffect(() => {
        const fetchPhotos = async () => {
            const res = await fetch(`/api/photos?earth_date=${earthDate}`);
            const data = await res.json();
            setPhotos(data.photos || []);
        };

        fetchPhotos();
    }, [earthDate]);

    return (
        <main style={{ padding: '2rem' }}>
            <h1>Mars Rover Photos by Earth Date</h1>

            <label>
                Choose a date:&nbsp;
                <input
                    type="date"
                    value={earthDate}
                    onChange={(e) => setEarthDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                />
            </label>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
                {photos.length === 0 && <p>No photos found for {earthDate}</p>}
                {photos.slice(0, 10).map((photo) => (
                    <div key={photo.id}>
                        <img src={photo.img_src} alt="Mars" width="200" />
                        <p>{photo.camera.full_name}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}

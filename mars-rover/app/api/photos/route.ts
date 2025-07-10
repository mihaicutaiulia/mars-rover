import { NextRequest, NextResponse } from 'next/server';
import { getCachedPhotosFromFile, savePhotosToCacheFile } from '@/lib/fileCache';

export async function GET(req: NextRequest) {
    const earthDate = req.nextUrl.searchParams.get('earth_date') || '2020-07-13';

    // check if we have cached data for this date
    const cached = getCachedPhotosFromFile(earthDate);
    if (cached) {
        console.log(`Cache hit for ${earthDate}`);
        return NextResponse.json(cached);
    }

    // if not cached, fetch from NASA API
    const apiKey = process.env.NASA_API_KEY;
    const nasaRes = await fetch(
        // `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${apiKey}`
        // fake api (i do not want to send accidental requests)
        `api`
    );

    if (!nasaRes.ok) {
        return NextResponse.json({ error: 'NASA API request failed' }, { status: 500 });
    }

    const data = await nasaRes.json();

    // save data to cache file
    savePhotosToCacheFile(earthDate, data);
    console.log(`Saved cache for ${earthDate}`);

    return NextResponse.json(data);
}

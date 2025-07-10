import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.resolve(process.cwd(), 'nasa-cache');

export function getCachedPhotosFromFile(date: string): any | null {
    const filePath = path.join(CACHE_DIR, `${date}.json`);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        try {
            return JSON.parse(content);
        } catch {
            return null;
        }
    }
    return null;
}

export function savePhotosToCacheFile(date: string, data: any): void {
    if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR);
    }

    const filePath = path.join(CACHE_DIR, `${date}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

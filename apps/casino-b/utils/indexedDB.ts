export function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("CasinoGamesDB", 1);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains("games")) {
                db.createObjectStore("games", { keyPath: "id" });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function saveGamesToDB(games: any[]) {
    const db = await openDB();
    const tx = db.transaction("games", "readwrite");
    const store = tx.objectStore("games");
    games.forEach(game => store.put(game));
    return tx.complete;
}

export async function getGamesFromDB(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
        const db = await openDB();
        const tx = db.transaction("games", "readonly");
        const store = tx.objectStore("games");
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// will need to move this to a shared component file. since we should be able to import it into both casinos. 
// maybe the lib/utils folder in @repo UI.

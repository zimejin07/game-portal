import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");

    try {
        // Read the file dynamically (without blocking the server)
        const filePath = path.join(process.cwd(), "apps/casino-a/data/games.json");
        const fileContents = await readFile(filePath, "utf-8");
        const games = JSON.parse(fileContents);

        // Paginate the results
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        return NextResponse.json({
            games: games.slice(startIndex, endIndex),
            total: games.length,
            hasMore: endIndex < games.length
        });

    } catch (error) {
        return NextResponse.json({ error: "Failed to load games" }, { status: 500 });
    }
}

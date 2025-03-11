import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "20");
  const filePath = path.join(process.cwd(), "data/games.json");

  try {
    const fileContents = await readFile(filePath, "utf-8");
    const games = JSON.parse(fileContents);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedGames = games.slice(startIndex, endIndex);
    return NextResponse.json({
      games: paginatedGames,
      total: games.length,
      hasMore: endIndex < games.length,
    });
  } catch (error) {
    console.error("Error while processing games.json:", error);
  }
}

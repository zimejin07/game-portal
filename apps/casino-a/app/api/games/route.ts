import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "20");

  const filePath = path.join(process.cwd(), "data/games.json");
  console.log(`📂 File path resolved: ${filePath}`);

  // Read the file contents asynchronously
  try {
    const fileContents = await readFile(filePath, "utf-8");
    console.log("📄 Successfully read games.json file");

    // Parse the JSON data
    const games = JSON.parse(fileContents);
    console.log(`🔍 Parsed ${games.length} games from JSON`);

    // Calculate pagination indices
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    console.log(
      `🔢 Pagination indices - Start: ${startIndex}, End: ${endIndex}`
    );

    // Slice the games array according to pagination
    const paginatedGames = games.slice(startIndex, endIndex);
    console.log(`🗂️ Returning ${paginatedGames.length} games for page ${page}`);

    return NextResponse.json({
      games: paginatedGames,
      total: games.length,
      hasMore: endIndex < games.length,
    });
  } catch (error) {
    console.error("❌ Error while processing games.json:", error);
  }
}

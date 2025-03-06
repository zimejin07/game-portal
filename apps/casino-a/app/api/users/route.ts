import { NextResponse } from "next/server";

// Mock users data
const users = [
    { id: 1, username: "john_doe", password: "password123", market: "en", name: "John", surname: "Doe" },
    { id: 2, username: "jane_smith", password: "securepass", market: "ca", name: "Jane", surname: "Smith" }
];

export async function GET() {
    return NextResponse.json({ users });
}

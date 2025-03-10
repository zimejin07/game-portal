"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserProfile } from "@repo/types";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const { market } = useParams();

  useEffect(() => {
    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="))
        ?.split("=")[1];
    if (cookieValue) {
      setUser(JSON.parse(decodeURIComponent(cookieValue)));
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Clear user cookie
    router.push(`/${market}/login`);
  };

  return (
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        {user ? (
            <>
              <p>Username: {user.username}</p>
              <p>Market: {user.market.toUpperCase()}</p>
              <button
                  onClick={handleLogout}
                  className="mt-4 bg-red-500 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
        ) : (
            <p>Loading user...</p>
        )}
      </div>
  );
}

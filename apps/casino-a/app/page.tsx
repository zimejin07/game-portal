import React from "react";
import {GAME_NAME} from "@repo/constants";
import config from "@/config";
import Button from "@repo/ui/components/ui/button";

export default function Home() {
  return (
      <div>
        <h1>Welcome to {GAME_NAME} - {config.name}</h1>
        <p>Menu Position: {config.menuPosition}</p>
        <Button label="Play Now" onClick={} />
      </div>
  );
}

"use client"; 

import { Provider } from "react-redux";
import { store } from "@repo/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

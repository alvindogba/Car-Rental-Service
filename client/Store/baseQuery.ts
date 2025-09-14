import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

// Prefer env; fallback to current host on port 3000 for LAN/mobile testing
const envBackendUrl = import.meta.env.VITE_APP_BACKEND_URL as string | undefined;
const fallbackBackendUrl =
  typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : "http://localhost:3000";
let backendUrl = envBackendUrl && envBackendUrl.length > 0 ? envBackendUrl : fallbackBackendUrl;

// If env points to localhost, rewrite to current device hostname for mobile testing
try {
  const parsed = new URL(backendUrl);
  const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(parsed.hostname);
  if (typeof window !== "undefined" && isLocalHost) {
    parsed.hostname = window.location.hostname;
    backendUrl = parsed.toString();
  }
} catch {
  // ignore URL parse errors and use as-is
}

export const baseQuery = fetchBaseQuery({
  baseUrl: backendUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

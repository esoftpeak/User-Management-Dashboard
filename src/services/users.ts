import "server-only";

import type { DummyJsonListResponse } from "@/types/dummyjson";
import type { User } from "@/types/user";

const BASE_URL = "https://dummyjson.com";

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `API request failed (${res.status} ${res.statusText})${text ? `: ${text}` : ""}`
    );
  }

  return (await res.json()) as T;
}

export async function getUsers(params?: { limit?: number; skip?: number }) {
  const limit = params?.limit ?? 100;
  const skip = params?.skip ?? 0;
  const url = new URL(`${BASE_URL}/users`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));
  return await requestJson<DummyJsonListResponse<User>>(url.toString());
}

export async function getUserById(id: number) {
  return await requestJson<User>(`${BASE_URL}/users/${id}`);
}


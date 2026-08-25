export interface BlogPost {
  title: string;
  link: string;
  publishedAt: string;
  tags: string[];
  coverImage: string | null;
  preview: string;
  readingMinutes: number;
}

const API_URL = import.meta.env.VITE_WORKER_API_URL;

export async function getPosts(): Promise<BlogPost[]> {
  if (!API_URL) {
    throw new Error("VITE_WORKER_API_URL is not configured");
  }
  const response = await fetch(`${API_URL.replace(/\/$/, "")}/posts`);
  if (!response.ok) {
    throw new Error(`worker responded with status ${response.status}`);
  }
  const data = (await response.json()) as { posts: BlogPost[] };
  return data.posts;
}

export interface CvAccessResponse {
  folderUrl: string;
  expiresAt: string;
}

export class ApiError extends Error {
  constructor(public code: string) {
    super(code);
    this.name = "ApiError";
  }
}

export async function requestCvAccess(email: string): Promise<CvAccessResponse> {
  if (!API_URL) {
    throw new ApiError("config");
  }
  const response = await fetch(`${API_URL.replace(/\/$/, "")}/cv/access`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = (await response.json().catch(() => ({}))) as {
    error?: string;
    folderUrl?: string;
    expiresAt?: string;
  };
  if (!response.ok) {
    throw new ApiError(data.error ?? "unknown_error");
  }
  return { folderUrl: data.folderUrl!, expiresAt: data.expiresAt! };
}

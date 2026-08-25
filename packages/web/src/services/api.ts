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

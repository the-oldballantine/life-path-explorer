const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error || `API error: ${res.status}`);
  }

  return res.json();
}

// Auth
export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthResponse {
  user: AuthUser;
  profile: unknown | null;
}

export async function register(email: string, password: string) {
  return api<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function login(email: string, password: string) {
  return api<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  return api<{ success: boolean }>("/api/auth/logout", { method: "POST" });
}

export async function getMe() {
  return api<AuthResponse>("/api/auth/me");
}

// Profile
export interface ProfileData {
  id?: string;
  name: string;
  age: string;
  gender: string;
  location: string;
  schooling: string;
  college: string;
  degree: string;
  workStatus: string;
  industry: string;
  yearsExperience: string;
  familyStructure: string;
  financialCondition: string;
  familyRelationship: string;
  personality: string;
  riskAppetite: string;
  decisionStyle: string;
  discipline: string;
  interests: string;
  hobbies: string;
  relationshipStatus: string;
  lifeGoals: string;
  currentChallenges: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function saveProfile(data: ProfileData) {
  return api<ProfileData>("/api/profiles", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function fetchProfile() {
  return api<ProfileData>("/api/profiles");
}

// Narratives
export interface NarrativeRecord {
  id: string;
  path: string;
  mode: string;
  tenure: number;
  scenario: string | null;
  title: string;
  subtitle: string;
  summary: string;
  years: string; // JSON string
  createdAt: string;
}

export async function generateNarrative(params: {
  path: string;
  mode: string;
  tenure: number;
  scenario?: string;
  customPrompt?: string;
}) {
  return api("/api/narratives/generate", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function saveNarrative(data: {
  path: string;
  mode: string;
  tenure: number;
  scenario?: string;
  title: string;
  subtitle: string;
  summary: string;
  years: string;
}) {
  return api<NarrativeRecord>("/api/narratives", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchNarratives() {
  return api<NarrativeRecord[]>("/api/narratives");
}

export async function fetchNarrative(id: string) {
  return api<NarrativeRecord>(`/api/narratives/${id}`);
}

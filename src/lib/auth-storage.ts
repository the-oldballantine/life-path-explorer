import { AuthUser } from "@/types/auth";

const AUTH_STORAGE_KEY = "life_path_explorer_auth";

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateToken(): string {
  return `token_${Date.now()}_${Math.random().toString(36).substr(2, 32)}`;
}

export function saveUserToStorage(user: AuthUser): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save auth user to localStorage:", error);
  }
}

export function getUserFromStorage(): AuthUser | null {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as AuthUser;
  } catch (error) {
    console.error("Failed to read auth user from localStorage:", error);
    return null;
  }
}

export function clearAuthFromStorage(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear auth from localStorage:", error);
  }
}

export function createAuthUser(email: string, name?: string): AuthUser {
  return {
    id: generateId(),
    email: email.toLowerCase().trim(),
    name: name || email.split("@")[0],
    token: generateToken(),
    createdAt: Date.now(),
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

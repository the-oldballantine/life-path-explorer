export interface AuthUser {
  id: string;
  email: string;
  name: string;
  token: string;
  createdAt: number;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends AuthCredentials {
  name?: string;
}

export interface AuthService {
  login(credentials: AuthCredentials): Promise<AuthUser>;
  signup(credentials: SignupCredentials): Promise<AuthUser>;
  logout(): Promise<void>;
  getCurrentUser(): AuthUser | null;
  isAuthenticated(): boolean;
}

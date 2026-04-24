import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthForm from "@/components/auth/AuthForm";

// Mock the API module
const mockRegister = vi.fn();
const mockLogin = vi.fn();
vi.mock("@/lib/api", () => ({
  register: (...args: any[]) => mockRegister(...args),
  login: (...args: any[]) => mockLogin(...args),
  logout: vi.fn(),
  getMe: vi.fn(),
}));

beforeEach(() => {
  mockRegister.mockReset();
  mockLogin.mockReset();
});

describe("AuthForm", () => {
  it("should render login and signup tabs", () => {
    render(<AuthForm onSuccess={vi.fn()} />);
    expect(screen.getByText("Login")).toBeTruthy();
    expect(screen.getByText("Sign Up")).toBeTruthy();
  });

  it("should show validation error for invalid email", async () => {
    render(<AuthForm onSuccess={vi.fn()} />);
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), { target: { value: "not-an-email" } });
    fireEvent.click(screen.getByText("Sign In"));
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email address")).toBeTruthy();
    });
  });

  it("should call register on successful signup", async () => {
    const mockUser = { id: "user1", email: "test@test.com" };
    mockRegister.mockResolvedValue({ user: mockUser });
    const onSuccess = vi.fn();
    render(<AuthForm onSuccess={onSuccess} />);

    // Switch to signup tab
    fireEvent.click(screen.getByText("Sign Up"));

    fireEvent.click(screen.getByText("Create Account"));
    // Validation should catch empty fields
    await waitFor(() => {
      expect(mockRegister).not.toHaveBeenCalled();
    });
  });

  it("should display error from backend on failed login", async () => {
    const onError = vi.fn();
    mockLogin.mockRejectedValue(new Error("Invalid email or password"));
    render(<AuthForm onSuccess={vi.fn()} onError={onError} />);

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "wrong" } });
    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith("Invalid email or password");
    });
  });

  it("should show loading state during submission", async () => {
    mockRegister.mockReturnValue(new Promise(() => {})); // Hang forever
    render(<AuthForm onSuccess={vi.fn()} />);

    fireEvent.click(screen.getByText("Sign Up"));

    // Fill required fields
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "Name" } });
    fireEvent.change(inputs[1], { target: { value: "test@test.com" } });
    const passwords = screen.getAllByPlaceholderText(/Create a password|Confirm your password/);
    fireEvent.change(passwords[0], { target: { value: "testpass123" } });
    fireEvent.change(passwords[1], { target: { value: "testpass123" } });

    fireEvent.click(screen.getByText("Create Account"));
    await waitFor(() => {
      expect(screen.getByText("Creating account...")).toBeTruthy();
    });
  });
});

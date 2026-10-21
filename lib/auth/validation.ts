export interface AuthInput {
  name?: string;
  email: string;
  password: string;
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function validateRegistration(input: AuthInput) {
  const name = input.name?.trim() ?? "";
  const email = normalizeEmail(input.email);

  if (name.length < 2 || name.length > 100) {
    return "Please enter a name between 2 and 100 characters.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address.";
  }

  if (
    input.password.length < 8 ||
    input.password.length > 72 ||
    !/[A-Za-z]/.test(input.password) ||
    !/[0-9]/.test(input.password)
  ) {
    return "Password must be 8-72 characters and include a letter and a number.";
  }

  return null;
}

export function validateLogin(input: AuthInput) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(input.email))) {
    return "Please enter a valid email address.";
  }

  if (!input.password) {
    return "Please enter your password.";
  }

  return null;
}

import { z } from "zod";

// Email validation
const emailValidation = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email");

// Password validation
const passwordValidation = z
  .string()
  .trim()
  .min(8, "Password must contain at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

// Name validation
const nameValidation = z.string().trim().min(1, "Name is required");

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpSchema = z
  .object({
    name: nameValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgetPasswordSchema = z.object({
  email: emailValidation,
});

export const resetPasswordSchema = z
  .object({
    newPassword: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

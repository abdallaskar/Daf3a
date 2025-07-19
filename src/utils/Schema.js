import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be less than 50 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
    countryCode: z.string().min(1, "Country code is required"),

    confirmPassword: z.string().min(1, "Confirm Password is required"),
    role: z.enum(["student", "mentor"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

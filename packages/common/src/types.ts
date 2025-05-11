import { z } from "zod";

export const userSchema = z.object({
    name: z.string().nonempty(),
    username: z.string().min(3).max(20).nonempty(),
    email: z.string().email("Please enter a valid email address").nonempty(),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
        "Password needs 1 upper, 1 lower, 1 digit, 1 special char"
      )
      .nonempty(),
});

export const signInSchema = z.object({
    email: z.string().email("Please enter a valid email").nonempty(),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
        "Password needs 1 upper, 1 lower, 1 digit, 1 special char"
      )
      .nonempty(),
})

export const roomSchema = z.object({
    roomName: z.string().min(3).max(20).nonempty()
});
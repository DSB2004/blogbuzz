
import { z } from 'zod'

export const ValidateAuth = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(4, 'Password must be at least 8 characters long')
})


export const ValidateResetPassword = z.object({
    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
    copyPassword: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
}).refine((data) => data.newPassword === data.copyPassword, {
    path: ["copyPassword"],
    message: "Passwords do not match",
});

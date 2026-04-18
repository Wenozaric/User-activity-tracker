import { z } from 'zod'

export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const RegisterSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string()
})

export const User = z.object({
    name: z.string(),
})
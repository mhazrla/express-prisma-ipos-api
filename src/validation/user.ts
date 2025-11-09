import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { validationErrorResponse } from '@/utils/response'

export const GenderEnum = z.enum(['MALE', 'FEMALE'])
export const RoleEnum = z.enum(['ADMIN', 'ATTENDANT'])
const phoneRegex = /^\+?[0-9]{7,15}$/

// Preprocess DOB to a Date object if provided (accepts ISO strings or Date)
const datePreprocess = z.preprocess((arg) => {
  if (typeof arg === 'string' || arg instanceof Date) {
    const d = new Date(arg as any)
    return isNaN(d.getTime()) ? arg : d
  }
  return arg
}, z.date())

export const createUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  phone: z.string().regex(phoneRegex, { message: 'Invalid phone format' }).optional(),
  dob: datePreprocess.optional(),
  gender: GenderEnum,
  image: z.string().url().optional(),
  role: RoleEnum.optional(),
})

export const updateUserSchema = createUserSchema.partial()

export const validate = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    return validationErrorResponse(res, result.error.format())
  }
  // replace body with parsed/typed data
  req.body = result.data
  next()
}

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>

export default {
  createUserSchema,
  updateUserSchema,
  validate,
}

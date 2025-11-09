import { z } from 'zod';
import { Request, Response, NextFunction } from 'express'
import { validationErrorResponse } from '../utils/response'

export const createCustomerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
})

export const updateCustomerSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
})

export const validate = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    return validationErrorResponse(res, result.error.format())
  }
  // replace body with parsed/typed data
  req.body = result.data
  next()
}

export default { createCustomerSchema, updateCustomerSchema, validate }

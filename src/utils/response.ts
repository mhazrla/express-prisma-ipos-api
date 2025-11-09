import { Response } from 'express'

type Meta = {
  status?: number
  message?: string
  [key: string]: any
}

export function successResponse(res: Response, data: any, meta: Meta = {}) {
  const status = meta.status ?? 200
  return res.status(status).json({
    success: true,
    message: meta.message ?? 'OK',
    data,
    meta,
  })
}

export function errorResponse(res: Response, message = 'Internal Server Error', status = 500, details?: any) {
  return res.status(status).json({
    success: false,
    message,
    error: details ?? null,
  })
}

export function validationErrorResponse(res: Response, issues: any) {
  return res.status(422).json({
    success: false,
    message: 'Validation failed',
    errors: issues,
  })
}

export default { successResponse, errorResponse, validationErrorResponse }

import { Request, Response } from 'express'
import { successResponse } from './response'

export function parsePagination(query: any) {
  const page = Math.max(Number(query.page || 1), 1)
  const limit = Math.min(Number(query.limit || 10), 100)
  const skip = (page - 1) * limit
  return { page, limit, skip }
}

export function buildPageUrl(req: Request, page: number, limit: number) {
  const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl)
  url.searchParams.set('page', String(page))
  url.searchParams.set('limit', String(limit))
  return url.toString()
}

export function setPaginationHeaders(req: Request, res: Response, page: number, limit: number, totalPages: number) {
  const links: string[] = []
  // first
  links.push(`<${buildPageUrl(req, 1, limit)}>; rel="first"`)
  // prev
  if (page > 1) links.push(`<${buildPageUrl(req, page - 1, limit)}>; rel="prev"`)
  // next
  if (page < totalPages) links.push(`<${buildPageUrl(req, page + 1, limit)}>; rel="next"`)
  // last
  links.push(`<${buildPageUrl(req, totalPages, limit)}>; rel="last"`)

  res.setHeader('X-Total-Pages', String(totalPages))
  res.setHeader('X-Total-Count', res.getHeader('X-Total-Count') ?? '')
  res.setHeader('Link', links.join(', '))
}

export function paginatedSuccessResponse(
  req: Request,
  res: Response,
  items: any[],
  total: number,
  page: number,
  limit: number,
  message = 'Items retrieved',
) {
  const totalPages = Math.ceil(total / limit) || 1
  // set Link headers
  setPaginationHeaders(req, res, page, limit, totalPages)

  // send standardized body
  return successResponse(res, items, {
    message,
    status: 200,
    total,
    page,
    limit,
    totalPages,
  })
}

export default { parsePagination, paginatedSuccessResponse, setPaginationHeaders }

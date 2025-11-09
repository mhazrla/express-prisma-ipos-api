import { Request, Response } from 'express'
import * as service from '@/services/customerService'
import { successResponse, errorResponse } from '@/utils/response'
import { parsePagination, paginatedSuccessResponse } from '@/utils/pagination'

export async function createCustomer(req: Request, res: Response) {
    try {
        const newCustomer = await service.createCustomer(req.body)

        return successResponse(res, newCustomer, { status: 201, message: 'Customer created' })
    } catch (err: any) {
        if (err?.code === 'P2002') {
            return errorResponse(res, 'Customer with this email already exists', 409, err.meta)
        }

        if (err?.code === 'P2012') {
            return errorResponse(res, 'Missing required fields', 400, err.meta)
        }

        console.error(err)
        return errorResponse(res)
    }
}

export async function getCustomers(req: Request, res: Response) {
    const { page, limit, skip } = parsePagination(req.query)

    try {
        const [items, total] = await Promise.all([
            service.findCustomers(skip, limit),
            service.countCustomers(),
        ])

        return paginatedSuccessResponse(req, res, items, total, page, limit, 'Customers retrieved')
    } catch (err) {
        console.error(err)
        return errorResponse(res)
    }
}

export async function getCustomerById(req: Request, res: Response) {
    const { id } = req.params

    try {
        const customer = await service.findCustomerById(id)
        if (!customer) return errorResponse(res, 'Customer not found', 404)
        return successResponse(res, customer, { message: 'Customer retrieved' })
    } catch (err) {
        console.error(err)
        return errorResponse(res)
    }
}

export async function updateCustomer(req: Request, res: Response) {
    const { id } = req.params
    const data = req.body

    try {
        const existing = await service.findCustomerById(id)
        if (!existing) return errorResponse(res, 'Customer not found', 404)

        const updated = await service.updateCustomer(id, data)
        return successResponse(res, updated, { message: 'Customer updated' })
    } catch (err: any) {
        if (err?.code === 'P2025') {
            return errorResponse(res, 'Customer not found', 404)
        }
        if (err?.code === 'P2002') {
            return errorResponse(res, 'Email already in use', 409)
        }
        console.error(err)
        return errorResponse(res)
    }
}

export async function deleteCustomer(req: Request, res: Response) {
    const { id } = req.params
    try {
        // pre-check
        const existing = await service.findCustomerById(id)
        if (!existing) return errorResponse(res, 'Customer not found', 404)

        await service.deleteCustomerById(id)
        return successResponse(res, null, { message: 'Customer deleted' })
    } catch (err: any) {
        if (err?.code === 'P2025') {
            return errorResponse(res, 'Customer not found', 404)
        }
        console.error(err)
        return errorResponse(res)
    }
}

export default { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer }
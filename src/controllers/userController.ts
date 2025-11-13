import { Request, Response } from 'express'
import * as service from '@/services/userService';
import { successResponse, errorResponse } from '@/utils/response'
import { parsePagination, paginatedSuccessResponse } from '@/utils/pagination'
import { UserFilters } from '@/interfaces/IUser';
import { isValidRole } from '@/utils/types';

export async function createUser(req: Request, res: Response) {
    try {
        const newUser = await service.createUser(req.body)

        return successResponse(res, newUser, { status: 201, message: 'User created' })
    } catch (err: any) {
        if (err?.code === 'P2002') {
            return errorResponse(res, 'User with this email already exists', 409, err.meta)
        }

        if (err?.code === 'P2012') {
            return errorResponse(res, 'Missing required fields', 400, err.meta)
        }

        console.error(err)
        return errorResponse(res)
    }
}

export async function getUsers(req: Request, res: Response) {
    const { page, limit, skip } = parsePagination(req.query)

    const { role } = req.query;
    const filters: UserFilters = {};
    
    if (isValidRole(role)) {
        filters.role = role;
    }

    try {
        const [items, total] = await Promise.all([
            service.findUsers(skip, limit, filters),
            service.countUsers(filters),
        ])

        return paginatedSuccessResponse(req, res, items, total, page, limit, 'User retrieved')
    } catch (err) {
        console.error(err)
        return errorResponse(res)
    }
}

export async function getUserById(req: Request, res: Response) {
    const { id } = req.params

    try {
        const customer = await service.findUserById(id)
        if (!customer) return errorResponse(res, 'User not found', 404)
        return successResponse(res, customer, { message: 'User retrieved' })
    } catch (err) {
        console.error(err)
        return errorResponse(res)
    }
}

export async function updateUser(req: Request, res: Response) {
    const { id } = req.params
    const data = req.body

    try {
        const existing = await service.findUserById(id)
        if (!existing) return errorResponse(res, 'User not found', 404)

        const updated = await service.updateUser(id, data)
        return successResponse(res, updated, { message: 'User updated' })
    } catch (err: any) {
        if (err?.code === 'P2025') {
            return errorResponse(res, 'User not found', 404)
        }
        if (err?.code === 'P2002') {
            return errorResponse(res, 'Email already in use', 409)
        }
        console.error(err)
        return errorResponse(res)
    }
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params
    try {
        const existing = await service.findUserById(id)
        if (!existing) return errorResponse(res, 'User not found', 404)

        await service.deleteUserById(id)
        return successResponse(res, null, { message: 'User deleted' })
    } catch (err: any) {
        if (err?.code === 'P2025') {
            return errorResponse(res, 'User not found', 404)
        }
        console.error(err)
        return errorResponse(res)
    }
}

export default { createUser, getUsers, getUserById, updateUser, deleteUser }
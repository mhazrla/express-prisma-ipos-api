import { Request, Response } from "express";
import * as service from '@/services/shopService';
import { successResponse, errorResponse } from "@/utils/response";
import { parsePagination, paginatedSuccessResponse } from "@/utils/pagination";

export async function getShops(req: Request, res: Response) {
    const {page, limit, skip } = parsePagination(req.query);

    try {
        const [items, total] = await Promise.all([
            service.findShops(skip, limit),
            service.countShops()
        ]);

        return paginatedSuccessResponse(req, res, items, total, page, limit, 'Shop retrieved')

    } catch (err) {
        console.error(err)
        return errorResponse(res)
    }
}

export async function createShop(req: Request, res: Response) {
    try {
        const newShop = await service.createShop(req.body)
        
        return successResponse(res, newShop, { status: 201, message: 'Shop created' })
    } catch (err: any) {
        if (err?.code === 'P2002') {
            return errorResponse(res, 'Shop already exists', 409, err.meta)
        }

        if (err?.code === 'P2012') {
            return errorResponse(res, 'Missing required fields', 400, err.meta)
        }

        console.error(err)
        return errorResponse(res)
    }
}
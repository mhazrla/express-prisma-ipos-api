import { Prisma, Shop } from "@prisma/client";
import prisma from '@/lib/prisma'

export async function findShops(skip: number, take: number): Promise<Shop[]> {
    return prisma.shop.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' }
    })
}

export async function createShop(data: Prisma.ShopCreateInput): Promise<Shop> {
  return prisma.shop.create({ data })
}

export async function countShops(): Promise<number> {
  return prisma.user.count()
}

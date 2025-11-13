import { Role } from '@prisma/client'

export function isValidRole(role: any): role is Role {
    if (typeof role !== 'string') {
        return false
    }

    return Object.values(Role).includes(role as Role)
}
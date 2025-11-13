import { Role } from "@prisma/client";

export interface UserFilters {
    role?: Role;
}
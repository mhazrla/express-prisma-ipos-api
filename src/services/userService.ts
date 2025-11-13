import { UserFilters } from '@/interfaces/IUser'
import prisma from '@/lib/prisma'
import { User, Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10

// Helper to exclude keys from an object
function exclude<T, Key extends keyof T>(obj: T, keys: Key[]): Omit<T, Key> {
  for (let key of keys) {
    delete obj[key]
  }
  return obj
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function createUser(data: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
  // If password provided, hash it before creating
  if (data && (data as any).password) {
    const plain = (data as any).password as string
    ;(data as any).password = await hashPassword(plain)
  }

  const user = await prisma.user.create({ data })
  return exclude(user, ['password'])
}

export async function findUserById(id: string): Promise<Omit<User, 'password'> | null> {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) return null
  return exclude(user, ['password'])
}

export async function findUsers(skip: number, take: number, filters: UserFilters): Promise<Omit<User, 'password'>[]> {
  const whereClause: Prisma.UserWhereInput = {};

  if (filters.role) {
    whereClause.role = filters.role
  }
  
  const users = await prisma.user.findMany({
    where: whereClause,
    skip,
    take,
    orderBy: { createdAt: 'desc' },
  })
  return users.map((user) => exclude(user, ['password']))
}

export async function countUsers(filters: UserFilters): Promise<number> {
  const whereClause: Prisma.UserWhereInput = {};

  if (filters.role) {
    whereClause.role = filters.role;
  }

  return prisma.user.count({
    where: whereClause,
  })
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput): Promise<Omit<User, 'password'>> {
  // If password is being updated, hash it. Support both direct string and { set: string }
  if (data && (data as any).password) {
    const pwdField = (data as any).password
    if (typeof pwdField === 'string') {
      ;(data as any).password = await hashPassword(pwdField)
    } else if (pwdField && typeof pwdField === 'object' && typeof pwdField.set === 'string') {
      pwdField.set = await hashPassword(pwdField.set)
      ;(data as any).password = pwdField
    }
  }

  const user = await prisma.user.update({ where: { id }, data })
  return exclude(user, ['password'])
}

export async function deleteUserById(id: string): Promise<Omit<User, 'password'>> {
  const user = await prisma.user.delete({ where: { id } })
  return exclude(user, ['password'])
}

export default {
  createUser,
  hashPassword,
  findUserById,
  findUsers,
  countUsers,
  updateUser,
  deleteUserById,
}

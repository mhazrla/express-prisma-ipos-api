import prisma from '@/lib/prisma'
import { Customer, Prisma } from '@prisma/client'

export async function createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
  return prisma.customer.create({ data })
}

export async function findCustomerById(id: string): Promise<Customer | null> {
  return prisma.customer.findUnique({ where: { id } })
}

export async function findCustomers(skip: number, take: number): Promise<Customer[]> {
  return prisma.customer.findMany({ 
    skip, 
    take, 
    orderBy: { createdAt: 'desc' } 
  })
}

export async function countCustomers(): Promise<number> {
  return prisma.customer.count()
}

export async function updateCustomer(id: string, data: Prisma.CustomerUpdateInput): Promise<Customer> {
  return prisma.customer.update({ where: { id }, data })
}

export async function deleteCustomerById(id: string): Promise<Customer> {
  return prisma.customer.delete({ where: { id } })
}

export default {
  createCustomer,
  findCustomerById,
  findCustomers,
  countCustomers,
  updateCustomer,
  deleteCustomerById,
}

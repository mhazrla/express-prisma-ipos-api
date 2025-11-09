import prisma from '../lib/prisma'

export async function createCustomer(data: { name: string; email: string; phone?: string }) {
  return prisma.customer.create({ data })
}

export async function findCustomerById(id: string) {
  return prisma.customer.findUnique({ where: { id } })
}

export async function findCustomers(skip: number, take: number) {
  return prisma.customer.findMany({ skip, take, orderBy: { createdAt: 'desc' } })
}

export async function countCustomers() {
  return prisma.customer.count()
}

export async function updateCustomer(id: string, data: any) {
  return prisma.customer.update({ where: { id }, data })
}

export async function deleteCustomerById(id: string) {
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

import express from 'express'
import {
	createCustomer,
	getCustomerById,
	getCustomers,
	updateCustomer,
	deleteCustomer,
} from '@/controllers/customerController'
import { validate, createCustomerSchema, updateCustomerSchema } from '@/validation/customer'

const customerRouter = express.Router()

// List with pagination: /api/v1/customers?page=1&limit=10
customerRouter.get('/', getCustomers)
customerRouter.post('/', validate(createCustomerSchema), createCustomer)
customerRouter.get('/:id', getCustomerById)
customerRouter.put('/:id', validate(updateCustomerSchema), updateCustomer)
customerRouter.delete('/:id', deleteCustomer)

export default customerRouter
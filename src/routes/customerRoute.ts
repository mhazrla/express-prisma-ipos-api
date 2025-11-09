import express from 'express'
import {
	createCustomer,
	getCustomerById,
	getCustomers,
	updateCustomer,
	deleteCustomer,
} from '../controllers/customerController'
import { validate, createCustomerSchema, updateCustomerSchema } from '../validation/customer'

const customerRouter = express.Router()

// List with pagination: /api/v1/customers?page=1&limit=10
customerRouter.get('/customers', getCustomers)

// Create
customerRouter.post('/customers', validate(createCustomerSchema), createCustomer)

// Get by id
customerRouter.get('/customers/:id', getCustomerById)

// Update
customerRouter.put('/customers/:id', validate(updateCustomerSchema), updateCustomer)

// Delete
customerRouter.delete('/customers/:id', deleteCustomer)

export default customerRouter
import express from 'express'
import {
	createUser, 
	deleteUser,
	getUser,
	getUserById,
	updateUser
} from '@/controllers/userController'
import { validate, createUserSchema, updateUserSchema } from '@/validation/user'

const userRouter = express.Router()

// List with pagination: /api/v1/users?page=1&limit=10
userRouter.get('/', getUser)
userRouter.post('/', validate(createUserSchema), createUser)
userRouter.get('/:id', getUser)
userRouter.put('/:id', validate(updateUserSchema), updateUser)
userRouter.delete('/:id', deleteUser)

export default userRouter
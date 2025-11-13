import express from 'express'
import {
	createUser, 
	deleteUser,
	getUsers,
	getUserById,
	updateUser
} from '@/controllers/userController'
import { validate, createUserSchema, updateUserSchema } from '@/validation/user'

const userRouter = express.Router()

// List with pagination: /api/v1/users?page=1&limit=10
userRouter.get('/', getUsers)
userRouter.post('/', validate(createUserSchema), createUser)
userRouter.get('/:id', getUserById)
userRouter.put('/:id', validate(updateUserSchema), updateUser)
userRouter.delete('/:id', deleteUser)

export default userRouter
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'IPOS API',
    version: '1.0.0',
    description: 'API documentation for customers and users endpoints',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  paths: {
    '/api/v1/users': {
      get: {
        summary: 'List users (paginated)',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' }, description: 'Page number' },
          { name: 'limit', in: 'query', schema: { type: 'integer' }, description: 'Page size' },
          {
            name: 'role',
            in: 'query',
            required: false,
            description: 'Filter users by role',
            schema: {
              type: 'string',
              enum: ['ADMIN', 'ATTENDANT'],
            },
          },
        ],
        responses: {
          '200': {
            description: 'A paginated list of users',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PaginatedUser' },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserCreate' },
            },
          },
        },
        responses: {
          '201': { description: 'User created', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } },
          '409': { description: 'Conflict - email already exists' },
          '422': { description: 'Validation error' },
        },
      },
    },
    '/api/v1/users/{id}': {
      get: {
        summary: 'Get a user by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'User', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } }, '404': { description: 'Not found' } },
      },
      put: {
        summary: 'Update a user',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UserUpdate' } } } },
        responses: { '200': { description: 'Updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } }, '404': { description: 'Not found' } },
      },
      delete: {
        summary: 'Delete a user',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } },
      },
    },
    '/api/v1/customers': {
      get: {
        summary: 'List customers (paginated)',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' }, description: 'Page number' },
          { name: 'limit', in: 'query', schema: { type: 'integer' }, description: 'Page size' },
        ],
        responses: {
          '200': {
            description: 'A paginated list of customers',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PaginatedCustomer' },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a customer',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CustomerCreate' },
            },
          },
        },
        responses: {
          '201': { description: 'Customer created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Customer' } } } },
          '409': { description: 'Conflict - email already exists' },
          '422': { description: 'Validation error' },
        },
      },
    },
    '/api/v1/customers/{id}': {
      get: {
        summary: 'Get a customer by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Customer', content: { 'application/json': { schema: { $ref: '#/components/schemas/Customer' } } } }, '404': { description: 'Not found' } },
      },
      put: {
        summary: 'Update a customer',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CustomerUpdate' } } } },
        responses: { '200': { description: 'Updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Customer' } } } }, '404': { description: 'Not found' } },
      },
      delete: {
        summary: 'Delete a customer',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string', format: 'email' },
          username: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          phone: { type: 'string', nullable: true },
          dob: { type: 'string', format: 'date', nullable: true },
          gender: { type: 'string', enum: ['MALE', 'FEMALE'] },
          image: { type: 'string', format: 'url', nullable: true },
          role: { type: 'string', enum: ['ADMIN', 'ATTENDANT'] },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      UserCreate: {
        type: 'object',
        required: ['email', 'username', 'password', 'firstName', 'lastName', 'gender'],
        properties: {
          email: { type: 'string', format: 'email' },
          username: { type: 'string', minLength: 3 },
          password: { type: 'string', minLength: 8 },
          firstName: { type: 'string', minLength: 1 },
          lastName: { type: 'string', minLength: 1 },
          phone: { type: 'string', pattern: '^\\+?[0-9]{7,15}'},
          dob: { type: 'string', format: 'date-time' },
          gender: { type: 'string', enum: ['MALE', 'FEMALE'] },
          image: { type: 'string', format: 'url' },
          role: { type: 'string', enum: ['ADMIN', 'ATTENDANT'] },
        },
      },
      UserUpdate: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          username: { type: 'string', minLength: 3 },
          password: { type: 'string', minLength: 8 },
          firstName: { type: 'string', minLength: 1 },
          lastName: { type: 'string', minLength: 1 },
          phone: { type: 'string', pattern: '^\\+?[0-9]{7,15}'},
          dob: { type: 'string', format: 'date-time' },
          gender: { type: 'string', enum: ['MALE', 'FEMALE'] },
          image: { type: 'string', format: 'url' },
          role: { type: 'string', enum: ['ADMIN', 'ATTENDANT'] },
        },
      },
      PaginatedUser: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { type: 'array', items: { $ref: '#/components/schemas/User' } },
          meta: {
            type: 'object',
            properties: {
              total: { type: 'integer' },
              page: { type: 'integer' },
              limit: { type: 'integer' },
              totalPages: { type: 'integer' },
            },
          },
        },
      },
      Customer: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      CustomerCreate: {
        type: 'object',
        required: ['name', 'email'],
        properties: { name: { type: 'string' }, email: { type: 'string' }, phone: { type: 'string' } },
      },
      CustomerUpdate: {
        type: 'object',
        properties: { name: { type: 'string' }, email: { type: 'string' }, phone: { type: 'string' } },
      },
      PaginatedCustomer: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { type: 'array', items: { $ref: '#/components/schemas/Customer' } },
          meta: {
            type: 'object',
            properties: { total: { type: 'integer' }, page: { type: 'integer' }, limit: { type: 'integer' }, totalPages: { type: 'integer' } },
          },
        },
      },
    }
  }
}

export default swaggerSpec

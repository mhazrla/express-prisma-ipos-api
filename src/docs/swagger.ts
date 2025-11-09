const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'IPOS API',
    version: '1.0.0',
    description: 'API documentation for customers endpoints',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  paths: {
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
    },
  },
}

export default swaggerSpec

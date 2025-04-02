import { Request, Response } from 'express';

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: "Users retrieved successfully"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
const getAllUsers = (req: Request, res: Response) => {
  // For demo purposes only
  const users = [
    {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      email: 'user@example.com',
      name: 'John Doe',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  res.status(200).json({
    status: 200,
    data: users,
    message: 'Users retrieved successfully',
  });
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a single user by their ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: "User retrieved successfully"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;

  // For demo purposes
  if (id === 'd290f1ee-6c54-4b01-90e6-d701748f0851') {
    const user = {
      id,
      email: 'user@example.com',
      name: 'John Doe',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    res.status(200).json({
      status: 200,
      data: user,
      message: 'User retrieved successfully',
    });
  } else {
    console.log('User not found');
  }
};

export default { getAllUsers, getUserById };
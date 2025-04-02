import { Request, Response } from 'express';

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags:
 *       - Users
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
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
 *       404:
 *         description: The requested resource was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
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
    res.status(404).json({
      status: 404,
      message: 'User not found'
    });
  }
};

export default { getAllUsers, getUserById };
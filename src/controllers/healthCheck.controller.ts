import { Request, Response } from 'express';

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check API health
 *     description: Returns the health status of the API including uptime and server info
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is operating normally
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     uptime:
 *                       type: number
 *                       description: Server uptime in seconds
 *                       example: 1234.56
 *                     message:
 *                       type: string
 *                       example: "OK"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00.000Z"
 *                     environment:
 *                       type: string
 *                       example: "development"
 *                 message:
 *                   type: string
 *                   example: "API is healthy"
 */
const healthCheck = (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: 'OK',
    date: new Date(),
    environment: process.env.NODE_ENV || 'development',
  };

  res.status(200).json({
    status: 200,
    data,
    message: 'API is healthy',
  });
};

export default { healthCheck };
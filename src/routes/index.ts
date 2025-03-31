import { Router } from 'express';
import healthCheckRoute from './healthCheck.route';
import userRoute from './user.route';

const router = Router();

// Define routes
router.use('/health', healthCheckRoute);
router.use('/users', userRoute);

export default router;
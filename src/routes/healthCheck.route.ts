import { Router } from 'express';
import { healthCheckController } from '../controllers';

const router = Router();

router.get('/', healthCheckController.healthCheck);

export default router;
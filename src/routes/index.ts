import express from 'express';

import aiRouter from './ai.routes';
import testsRouter from './tests.routes';

const router = express();

router.use('/v1/ai', aiRouter);
router.use('/v1/tests', testsRouter);

export default router;

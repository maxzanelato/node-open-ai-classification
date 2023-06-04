import { Request, Response, Router } from 'express';

const testsRouter = Router();

testsRouter.get('/', (req: Request, res: Response) => {
  res.send('Desgraça tested!');
});

export default testsRouter;

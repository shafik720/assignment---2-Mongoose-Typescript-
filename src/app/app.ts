import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from '../modules/user/user.route';

const app: Application = express();

// --- parser
app.use(express.json());
app.use(cors());

// --- using router
app.use('/api/users', UserRoutes) ; 

app.get('/', (req: Request, res: Response) => {
  res.send('Server Running Successfully ');
});

export default app;

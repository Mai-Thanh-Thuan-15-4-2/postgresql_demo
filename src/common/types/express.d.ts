import { AccountEntity } from '../entities/auth.entity';

declare global {
  namespace Express {
    interface Request {
      user?: AccountEntity;
    }
  }
}

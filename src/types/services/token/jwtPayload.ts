import { ObjectId } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

interface JWTPayload extends JwtPayload {
  id: ObjectId;
  isAdmin: boolean;
  isActivated: boolean;
}

export default JWTPayload;

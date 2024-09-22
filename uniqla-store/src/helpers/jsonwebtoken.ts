import { jwtVerify, SignJWT } from 'jose';
import jwt from 'jsonwebtoken';

const secretKey: string = process.env.JWT || ''; 

interface Payload {
  [key: string]: any; 
}

const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, secretKey);
};

const verifyToken = async (token: string): Promise<Payload> => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secretKey));

    console.log(payload)
    if (payload && typeof payload === 'object' && 'userId' in payload) {
      return payload as Payload;
    } else {
      throw new Error('Invalid payload structure');
    }
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export {
  generateToken,
  verifyToken,
};

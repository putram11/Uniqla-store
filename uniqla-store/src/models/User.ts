import { connectDB } from '../db/config';
import { ObjectId, Collection } from 'mongodb';
import { hashPassword, comparePassword } from '../helpers/bcrypt';
import { generateToken } from '../helpers/jsonwebtoken';

// User interface
export interface User {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface UserInput {
  name: string;
  username: string;
  email: string;
  password: string;
}

const getCollection = async (): Promise<Collection<User>> => {
  const db = await connectDB();
  return db.collection<User>('users'); 
};

export const createUser = async (userInput: UserInput): Promise<void> => {
  const collection = await getCollection();
  try {
    const hashedPassword = await hashPassword(userInput.password);

    const user: User = {
      _id: new ObjectId(),
      ...userInput,
      password: hashedPassword,
    };

    await collection.insertOne(user);
    console.log('User successfully created');
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export const verifyUserCredentials = async (email: string, password: string): Promise<User | null> => {
  const collection = await getCollection();
  try {
    const user = await collection.findOne({ email });
    if (user && await comparePassword(password, user.password)) {
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error verifying user credentials:', error);
    throw new Error('Failed to verify user credentials');
  }
};

export const makeToken = (userId: ObjectId): string => {
  try {
    const payload = { userId: userId.toString() };
    return generateToken(payload);
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate token');
  }
};

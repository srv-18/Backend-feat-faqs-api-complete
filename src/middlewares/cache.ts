import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';

type CachedData = {
  [key: string]: string;
};

export const cache = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const client = await  createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
    const key = `faqs:${req.query.lang || 'en'}`;
    const data = await client.get(key) as string;
    if(data) {
      const cachedData: CachedData = JSON.parse(data);
      res.json(cachedData);
    }
    next();
  } catch(error) {
    console.error('Cache error:', error);
    res.status(500);
  }
};
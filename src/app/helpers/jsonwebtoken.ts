import jwt from 'jsonwebtoken';

export interface Ijwt {
  email: string;
  name: string;
  id: string | number;
  jobs: string;
}

export interface IjwtComplete {
  iat: number;
  exp: number;
}

export const createJwt = (data: Ijwt) => {
  const jwtHash = process.env.HASH_JWT as string;

  return jwt.sign(data, jwtHash, { expiresIn: '24h' });
};

export const compareJwt = (
  token: string,
): (Ijwt & IjwtComplete) | undefined => {
  const jwtHash = process.env.HASH_JWT as string;

  try {
    const varifyToken = jwt.verify(token, jwtHash);

    if (typeof varifyToken === 'string') {
      return undefined;
    }

    return varifyToken as Ijwt & IjwtComplete;
  } catch (error) {
    return undefined;
  }
};

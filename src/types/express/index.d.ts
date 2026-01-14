export {};

declare global {
  namespace Express {
    interface Request {
      credentials?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

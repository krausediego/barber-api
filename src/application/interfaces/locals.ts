export type Locals = {
  traceId?: string;
  user?: {
    sub?: string;
    role?: 'EMPLOYEE' | 'ADMIN';
  };
};

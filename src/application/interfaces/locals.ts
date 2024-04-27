export type Locals = {
  traceId?: string;
  user?: {
    sub?: string;
    companyId?: string;
    role?: 'EMPLOYEE' | 'ADMIN';
  };
};

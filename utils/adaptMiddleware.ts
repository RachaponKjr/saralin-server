export const adaptMiddleware =
  (middleware: (arg0: any, arg1: any, arg2: (err: any) => void) => void) =>
  (context: { req: any; res: any }, next: () => unknown) =>
    new Promise((resolve, reject) =>
      middleware(context.req, context.res, (err: any) =>
        err ? reject(err) : resolve(next())
      )
    );

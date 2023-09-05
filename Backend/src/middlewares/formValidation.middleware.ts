import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { HttpException } from '../exceptions/HttpException';

const formValidationMiddleware =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.files, req.body, 'old Request');
      const schemaResponse = schema.parse({
        files: req.files,
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.files = schemaResponse.files;
      req.body = schemaResponse.body;
      req.query = schemaResponse.query;
      req.params = schemaResponse.params;
      console.log(req.files, req.body, 'new Request');
      next();
    } catch (e: any) {
      next(
        new HttpException(
          400,
          e.errors
            .map((error: any) => `${error.path[1]} ${error.message}`)
            .join(',')
        )
      );
    }
  };

export default formValidationMiddleware;

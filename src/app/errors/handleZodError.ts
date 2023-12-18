import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const errorMessageArray = errorSource.map((error) => error.message);
  let errorMessage: string;
  errorMessageArray.forEach((message) => (errorMessage += message));

  return {
    statusCode,
    message: 'zod error message.',
    errorSource,
  };
};

export default handleZodError;

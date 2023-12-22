import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  let errorMessage: string = '';
  const errorMessageArray = err.issues.map((issue: ZodIssue) => issue?.message);

  errorMessageArray.forEach(
    (message) => (errorMessage = errorMessage + message),
  );

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errorMessage,
  };
};

export default handleZodError;

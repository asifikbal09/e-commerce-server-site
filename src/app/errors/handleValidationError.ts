import httpStatus from 'http-status';
import { Error } from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';



const handelValidationError = (err: Error.ValidationError):TGenericErrorResponse => {
  const errorSource: TErrorSource = Object.values(err.errors).map(
    (val: Error.ValidatorError | Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Validation Error from Mongoose.',
    errorSource,
  };
};

export default handelValidationError;

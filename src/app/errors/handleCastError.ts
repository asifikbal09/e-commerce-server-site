import { Error } from 'mongoose';
import httpStatus from 'http-status';
import { TGenericErrorResponse } from '../interface/error';

const handelCastError = (err: Error.CastError): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Invalid Id.',
    errorMessage: `${err.value} is not a valid ID!`,
  };
};

export default handelCastError;

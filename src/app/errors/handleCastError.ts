import { Error } from 'mongoose';
import httpStatus from 'http-status';
import { TGenericErrorResponse } from '../interface/error';

const handelCastError = (err: Error.CastError): TGenericErrorResponse => {
  const errorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: err?.message || "Invalid Id.",
    errorSource,
  };
};

export default handelCastError;

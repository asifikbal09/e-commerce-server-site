/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractMessage = match && match[1];

  const errorSource: TErrorSource = [
    {
      path: '',
      message: `${extractMessage} is already exist.`,
    },
  ];

  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Validation Error from Mongoose.',
    errorSource,
  };
};

export default handleDuplicateError;

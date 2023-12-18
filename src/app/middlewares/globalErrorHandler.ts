/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import config from "../config";
import { ZodError } from "zod";
import AppError from "../errors/appError";
import handleZodError from "../errors/handleZodError";
import { TErrorSource } from "../interface/error";
import handelCastError from "../errors/handleCastError";
import handelValidationError from "../errors/handleValidationError";
import handleDuplicateError from "../errors/handleDuplicateError";



const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500
    let message = 'Something went wrong!';
  
    let errorSource: TErrorSource = [
      {
        path: '',
        message: 'Something want wrong!',
      },
    ];
  
    if (err instanceof ZodError) {
      const getError = handleZodError(err);
  
      statusCode = getError?.statusCode;
      message = getError?.message;
      errorSource = getError?.errorSource;
    } else if (err?.name === 'CastError') {
      const simplifiedError = handelCastError(err);
  
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSource = simplifiedError?.errorSource;
    } else if (err?.name === 'ValidationError') {
      const simplifiedError = handelValidationError(err);
  
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSource = simplifiedError?.errorSource;
    } else if (err?.code === 11000) {
      const simplifiedError = handleDuplicateError(err);
  
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSource = simplifiedError?.errorSource;
    } else if (err instanceof AppError) {
      statusCode = err?.statusCode;
      message = err?.message;
      errorSource = [
        {
          path: '',
          message: err?.message,
        },
      ];
    } else if (err instanceof Error) {
      message = err?.message;
      errorSource = [
        {
          path: '',
          message: err?.message,
        },
      ];
    }
  
    return res.status(statusCode).json({
      success: false,
      message,
      errorSource,
      errorDetails:err,
      stack: config.NODE_ENV === 'development' ? err?.stack : null,
    });
  };
  
  export default globalErrorHandler;
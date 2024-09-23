import { Request, Response, NextFunction } from 'express';
import { ALLOW_HTTP_CODE, HTTP_SUCCESS_MSG } from '@/constant';

const successHandler = ({
  statusCode = ALLOW_HTTP_CODE.ok,
  code = ALLOW_HTTP_CODE.ok,
  req,
  res,
  data,
  message,
}: {
  statusCode?: number;
  code?: number;
  req: Request;
  res: Response;
  data?: any;
  message?: string;
}) => {
  console.log('👇👇👇👇 success-handle 👇👇👇👇');
  const method = req.method;

  res.status(statusCode).json({
    code,
    data,
    message: message || HTTP_SUCCESS_MSG[method],
  });

  console.log('👆👆👆👆 success-handle 👆👆👆👆');
};

export default successHandler;

import {ExceptionFilter,Catch,ArgumentsHost,HttpStatus,} from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { Request, Response } from 'express';

import { NotFoundError } from './Notfound.exception';
import { BadRequestError } from './Badrequest.exception';
import { ConflictError } from './Conflict.Exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();
    const path = request.originalUrl;
    const method = request.method;   

    console.log(exception)

     if (exception instanceof BadRequestException) {
      const responseBody = exception.getResponse();
      let message = '';
      if (typeof responseBody === 'object' && responseBody['message']) {
        message = responseBody['message']; 
      } else {
        message = exception.message;
      }
      return response.status(HttpStatus.BAD_REQUEST).json({
        httpStatus: HttpStatus.BAD_REQUEST,
        error: exception.name,
        message,
        timestamp,
        path,
        method,
      });
    }


    
    if (exception instanceof BadRequestError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        httpStatus: HttpStatus.BAD_REQUEST,
        error: exception.name,
        message: exception.message,
        timestamp: exception.timestamp || timestamp,
        path,
        method,
      });
    }
    
    if (exception instanceof NotFoundError) {
      return response.status(HttpStatus.NOT_FOUND).json({
        httpStatus: HttpStatus.NOT_FOUND,
        error: exception.name,
        message: exception.message,
        timestamp: exception.timestamp || timestamp,
        path,
        method,
      });
    }  
    
    if (exception instanceof ConflictError) {
      return response.status(HttpStatus.CONFLICT).json({
        httpStatus: HttpStatus.CONFLICT,
        error: exception.name,
        message: exception.message,
        timestamp: exception.timestamp || timestamp,
        path,
        method,
      });
    }  
    
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Erro interno no servidor',
      error: exception.message || 'Erro desconhecido',
      timestamp,
      path,
      method,
    });
  }
}

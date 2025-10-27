import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestError extends HttpException {
  public timestamp: string;
  

  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
    this.timestamp = new Date().toISOString();  
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends HttpException {
  public timestamp: string;

  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
    this.timestamp = new Date().toISOString();
  }
}

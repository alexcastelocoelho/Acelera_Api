import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictError extends HttpException {
  public timestamp: string;

  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
    this.timestamp = new Date().toISOString();
  }
}

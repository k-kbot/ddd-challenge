import { HttpStatus } from '@nestjs/common';

export class DomainException extends Error {
  constructor(readonly errorMessage: string, readonly statusCode: HttpStatus) {
    super(errorMessage);
  }
}

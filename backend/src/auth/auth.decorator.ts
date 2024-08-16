import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

export function RequireAuthentication() {
  return UseGuards(AuthGuard);
}

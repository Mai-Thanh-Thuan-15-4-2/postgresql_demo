import { SetMetadata } from '@nestjs/common';

// TODO: E nên tạo ra 1 file constant chứa các role
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// TODO: Này decorator thì e nên tạo 1 folder riêng để chứa các decorator,
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString() // TODO: Em xem thêm validate mình customer lại cái message trả về lun nha
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

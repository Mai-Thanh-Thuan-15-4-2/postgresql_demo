import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Student } from '../../constants/entities/student.entity'; //TODO: E nên để thêm hậu tố Entity để dễ nhận biết
import { Account } from '../../constants/entities/auth.entity';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: configService.get<string>('TYPE') as any,
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [Student, Account],
  synchronize: false, //TODO: nhớ để false
});

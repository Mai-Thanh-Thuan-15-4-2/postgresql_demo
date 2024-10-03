// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.cefqqzhqenabbznqqqcn',
      password: 'P4WfWfj2Ty@Ai7',
      database: 'test',
      entities: [Student],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Student]),
    AuthModule, // Import AuthModule
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class AppModule {}

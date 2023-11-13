import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema from 'db/schemas/User';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: "User",
        schema: userSchema,
      },
    ])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}

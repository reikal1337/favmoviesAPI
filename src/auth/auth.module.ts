import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema from 'db/schemas/User';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: "User",
        schema: userSchema,
      },
    ]),
    JwtModule.register({})
  ],
  providers: [AuthService],
  controllers: [AuthController, JwtStrategy]
})
export class AuthModule {}

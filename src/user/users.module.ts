import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserRegisteration,
  userRegisterationSchema,
} from 'src/schemas/UserRegisteration.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserRegisteration.name,
        schema: userRegisterationSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersModule],
})
export class UsersModule {}

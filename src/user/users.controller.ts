import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  HttpException,
  UnauthorizedException,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/User.dto';
import * as bcrypt from 'bcryptjs';
import { AdminGuard } from 'src/schemas/NewProduct.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('new-registeration')
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.getUserByEmailId(createUserDto.email);
    if (data) {
      throw new HttpException('User Already Exists', HttpStatus.CONFLICT);
    }
    return this.usersService.createUser(createUserDto);
  }

  @Get('all-users')
  @UseGuards(AdminGuard)
  getAllUsers() {
    return this.usersService.getUsers();
  }

  @Get('user')
  async getUserDetails(@Body() emailID: any) {
    const { email } = emailID;

    const data = await this.usersService.getUserByEmailId(email);

    if (!data) {
      throw new HttpException('User Not Found', 404);
    }
    return data;
  }

  @Post('login')
  async login(@Body() data: any) {
    const { email, password } = data;
    const user: any | null = await this.usersService.getUserByEmailId(email);
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password Invalid');
    }

    return this.usersService.signIn(email);

    // throw new HttpException('Logged In Successfully', HttpStatus.OK);
  }

  @Get('userDetails')
  async userDetails(@Request() request: any) {
    const token = request.headers['authorization'];

    return this.usersService.userDetails(token);
  }

  
}

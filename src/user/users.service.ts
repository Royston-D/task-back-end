import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRegisteration } from 'src/schemas/UserRegisteration.schema';
import { CreateUserDto } from './dto/User.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserRegisteration.name)
    private userRegisteration: Model<UserRegisteration>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserRegisteration> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = new this.userRegisteration({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      createdAt: Date.now(),
    });
    return newUser.save();
  }

  async getUsers(): Promise<UserRegisteration[] | null> {
    return this.userRegisteration.find({ role: 'user' }).select('-password');
  }

  async getUserByEmailId(emailId: string): Promise<UserRegisteration | null> {
    return this.userRegisteration.findOne({ email: `${emailId}` });
  }

  async signIn(email: string): Promise<{ access_token: string }> {
    const user = await this.getUserByEmailId(email);
    // console.log('Payload', user);
    const payload = {
      userID: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async userDetails(accessToken: string): Promise<any | null> {
    const decodedToken = await this.jwtService.verifyAsync(accessToken);
    return decodedToken ? decodedToken : null;
  }
}

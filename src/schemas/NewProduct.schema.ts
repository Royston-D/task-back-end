import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Features, ProductCategory } from 'src/enums/enums';

@Schema()
export class NewProduct extends Document {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true, enum: ProductCategory })
  productCategory: ProductCategory;

  @Prop({ required: true })
  manufacturerName: string;

  @Prop({ required: true, enum: Features })
  features: Features;

  @Prop({ required: true })
  manufacturerBrand: string;

  @Prop({ required: true })
  productDescription: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  productImage: string;

  @Prop({ required: false, default: Date.now() })
  createdAt: Date;

  @Prop({ required: false })
  addedBy: string;
}

export const newProductSchema = SchemaFactory.createForClass(NewProduct);

@Schema()
export class NewCart extends Document {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  addedBy: string;

  @Prop({ required: false, default: Date.now() })
  createdAt: Date;
}

export const newCartSchema = SchemaFactory.createForClass(NewCart);

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();

      const authorizationHeader = request.headers['authorization'];
      if (!authorizationHeader) {
        throw new Error('Auth Token Not Found');
      }

      const token = authorizationHeader.split(' ')[1];
      const decodedToken = await this.jwtService.verifyAsync(token);

      if (decodedToken.role === 'admin') {
        return true;
      }
      return false;
    } catch (e) {
      throw new HttpException(`${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();

      const authorizationHeader = request.headers['authorization'];
      if (!authorizationHeader) {
        throw new Error('Auth Token Not Found');
      }

      const token = authorizationHeader.split(' ')[1];
      const decodedToken = await this.jwtService.verifyAsync(token);

      if (decodedToken.role === 'admin' || decodedToken.role === 'user') {
        return true;
      }
      return false;
    } catch (e) {
      throw new HttpException(`${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

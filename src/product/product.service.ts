import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewCart, NewProduct } from 'src/schemas/NewProduct.schema';
import { AddProductDto, CartItemDto } from './dto/Product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(NewProduct.name)
    private newProduct: Model<NewProduct>,
    @InjectModel(NewCart.name)
    private newCart: Model<NewCart>,
    private jwtService: JwtService,
  ) {}

  async addProduct(
    createProductDto: AddProductDto,

    token: string,
  ): Promise<NewProduct> {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);

      const data = {
        ...createProductDto,
        addedBy: decodedToken.userID,
      };
      const createdProduct = new this.newProduct(data);
      return await createdProduct.save();
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getProductDetails(): Promise<NewProduct[] | null> {
    return this.newProduct.find().select('-addedBy');
  }

  async getProductById(productId: string): Promise<NewProduct | null> {
    return this.newProduct.findOne({ _id: productId });
  }

  async addToCart(cartItem: CartItemDto, token: string) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      const existCart = this.getProductById(decodedToken.userID) ? true : false;
      if (existCart) {
        const oldCart = await this.newCart.findOne({
          addedBy: decodedToken.userID,
        });
        if (cartItem.productId === oldCart.productId) {
          oldCart.quantity = cartItem.quantity;
        }
        const cartProducts = new this.newCart(oldCart);
        return await cartProducts.save();
      } else {
        const data = {
          ...cartItem,
          addedBy: decodedToken.userID,
          _id: decodedToken.userID,
        };

        const cartProducts = new this.newCart(data);
        return await cartProducts.save();
      }
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeItemFromCart(productId: string, token: string) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      const existCart = this.getProductById(decodedToken.userID) ? true : false;
      if (existCart) {
      }
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

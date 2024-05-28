import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { AdminGuard, UserGuard } from 'src/schemas/NewProduct.schema';

import { AddProductDto, CartItemDto } from './dto/Product.dto';

@Controller('product')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Post('add-new-product')
  @UseGuards(AdminGuard)
  async addNewProduct(
    @Body() addProduct: AddProductDto,

    @Request() request: any,
  ) {
    const authorizationHeader = request.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];

    return this.productsService.addProduct(addProduct, token);
  }

  @Get('product-list')
  async productList() {
    return this.productsService.getProductDetails();
  }

  @Get('product-id')
  async productById(@Query() data: any) {
    return this.productsService.getProductById(data.productId);
  }

  @Post('add-to-cart')
  @UseGuards(UserGuard)
  async addToCart(@Body() cartItem: CartItemDto, @Request() request: any) {
    const authorizationHeader = request.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];

    return this.productsService.addToCart(cartItem, token);
  }
}

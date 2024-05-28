import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  NewCart,
  newCartSchema,
  NewProduct,
  newProductSchema,
} from 'src/schemas/NewProduct.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NewProduct.name,
        schema: newProductSchema,
      },
      {
        name: NewCart.name,
        schema: newCartSchema,
      },
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductModule],
})
export class ProductModule {}

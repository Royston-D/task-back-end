import { IsNotEmpty, IsNumber, isString, IsString } from 'class-validator';

export class AddProductDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  productCategory: string;

  @IsNotEmpty()
  @IsString()
  manufacturerName: string;

  @IsNotEmpty()
  @IsString()
  features: string;

  @IsNotEmpty()
  @IsString()
  manufacturerBrand: string;

  @IsNotEmpty()
  @IsString()
  productDescription: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class CartItemDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

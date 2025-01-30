import { IsDecimal, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCartDto {
    
  

    @IsDecimal({}, { message: 'Total Price must be a decimal' })
    @IsOptional()
    totalPrice: number;

    @IsDecimal({}, { message: 'Total Price After Discount must be a decimal' })
    @IsOptional()
    totalPriceAfterDiscount?: number;
   
    userId: number;

    @IsOptional()
    couponId?: number;
  }
  
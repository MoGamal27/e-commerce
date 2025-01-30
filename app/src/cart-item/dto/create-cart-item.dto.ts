import { IsNumber } from "class-validator";

export class CreateCartItemDto {

    @IsNumber({}, { message: 'Product ID must be a number' })
    productId: number;

    @IsNumber({}, { message: 'Quantity must be a number' })
    quantity: number;

    @IsNumber({}, { message: 'Cart ID must be a number' })
    cartId: number;
}

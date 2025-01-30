import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemsService: CartItemService) {}

  @Post()
  create(@Body() data: CreateCartItemDto) {
    return this.cartItemsService.createCartItem(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemsService.getCartItemById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCartItemDto) {
    return this.cartItemsService.updateCartItem(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemsService.deleteCartItem(+id);
  }
}

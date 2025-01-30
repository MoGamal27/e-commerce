import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() data: CreateCartDto) {
    return this.cartService.createCart(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.getCartById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCartDto) {
    return this.cartService.updateCart(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.deleteCart(+id);
  }
}

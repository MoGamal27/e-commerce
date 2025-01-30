import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  
  async createCart(data: CreateCartDto) {
    return this.prisma.cart.create({
      data,
    });
  }
  

  async getCartById(id: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: { cartItems: true },
    });

    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }

    return cart;
  }

  async updateCart(id: number, data: UpdateCartDto) {
    return this.prisma.cart.update({
      where: { id },
      data,
    });
  }

  async deleteCart(id: number) {
    return this.prisma.cart.delete({
      where: { id },
    });
  }
}

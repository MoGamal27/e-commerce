import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  async createCartItem(data: CreateCartItemDto) {
  
    const cartItem = await this.prisma.cartItems.create({
      data: {
        cartId: data.cartId,
        productId: data.productId,
        quantity: data.quantity,
      },
    });

    const cartItemWithProduct = await this.prisma.cartItems.findFirst({
      where: { cart: { id: data.cartId } },
      include: {
        product: true,
      },
    });
    
    if (!cartItemWithProduct) {
      throw new NotFoundException(`CartItem with ID ${data.cartId} not found`);
    }
    const totalPrice = cartItemWithProduct.product.price * cartItemWithProduct.quantity;
    const totalPriceAfterDiscount = totalPrice - (totalPrice * cartItemWithProduct.product.priceAfterDiscount / 100);
    
    await this.prisma.cart.update({
      where: { id: data.cartId },
      data: {
        totalPrice,
        totalPriceAfterDiscount,
      }
      });
      return {
        status: 'success',
        data: cartItem
      };
  }

  async getCartItemById(id: number) {
    const cartItem = await this.prisma.cartItems.findUnique({
      where: { id },
    });

    if (!cartItem) {
      throw new NotFoundException(`CartItem with ID ${id} not found`);
    }

    return cartItem;
  }

  async updateCartItem(id: number, data: UpdateCartItemDto) {
    return this.prisma.cartItems.update({
      where: { id },
      data,
    });
  }

  async deleteCartItem(id: number) {
    return this.prisma.cartItems.delete({
      where: { id },
    });
  }
}

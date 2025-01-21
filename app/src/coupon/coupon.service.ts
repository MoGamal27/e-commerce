import { HttpException, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}
  async create(createcouponDto: CreateCouponDto) {

    const currantDate = new Date();
    const expireDate = new Date(createcouponDto.expireDate);

    if(expireDate <= currantDate) {
      throw new HttpException('Expire date must be in the future', 400);
    }

    const newCoupon = await this.prisma.coupon.create({
      data: createcouponDto
    });

    return {
      status: 'success',
      message: 'Coupon created successfully',
      data: newCoupon
    };

  }

  async findAll() {
    const coupon = await this.prisma.coupon.findMany();
    return {
      status: 'success',
      data: coupon
    }
  }

 async findOne(id: number) {
   const coupon = await this.prisma.coupon.findUnique({ where: { id } });

   if (!coupon) {
     throw new HttpException('Coupon not found', 404);
   }
   return {
    status: 'success',
     data: coupon
   }
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return this.prisma.coupon.update({ where: { id }, data: updateCouponDto });
  }

  remove(id: number) {
    return this.prisma.coupon.delete({ where: { id } });
  }
}

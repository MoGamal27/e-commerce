import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Roles } from 'src/users/decorator/Roles.decorator';
import { AuthGuard } from 'src/auth/guard/Auth.guard';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  create(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    createcouponDto: CreateCouponDto,
  ) {
    return this.couponService.create(createcouponDto);
  }

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(+id);
  }

  @Patch(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    updatecouponDto: UpdateCouponDto,
  ) {
    return this.couponService.update(id, updatecouponDto);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(+id);
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}
  async create(createbrandDto: CreateBrandDto) {

    const newBrand = await this.prisma.brand.create({ data: createbrandDto });

    return {
      status: 'success',
      message: 'Brand created successfully',
      data: newBrand
    };

  }

  async findAll() {
    const brand = await this.prisma.brand.findMany();
    return {
      status: 'success',
      data: brand
    }
  }

 async findOne(id: number) {
   const brand = await this.prisma.brand.findUnique({ where: { id } });

   if (!brand) {
     throw new HttpException('Brand not found', 404);
   }
   return {
    status: 'success',
     data: brand
   }
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.prisma.brand.update({ where: { id }, data: updateBrandDto });
  }

  remove(id: number) {
    return this.prisma.brand.delete({ where: { id } });
  }
}

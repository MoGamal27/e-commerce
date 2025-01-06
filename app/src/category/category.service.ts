import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginate } from 'src/utils/pagination.util';
import { query } from 'express';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {

    const newCategory = await this.prisma.category.create({ data: createCategoryDto });

    return {
      status: 'success',
      message: 'Category created successfully',
      data: newCategory
    };

  }

  findAll() {
    return paginate(this.prisma, 'category',query, ['name']);
  }

 async findOne(id: number) {
   const category = await this.prisma.category.findUnique({ where: { id } });

   if (!category) {
     throw new HttpException('Category not found', 404);
   }
   return {
    status: 'success',
     data: category
   }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({ where: { id }, data: updateCategoryDto });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}

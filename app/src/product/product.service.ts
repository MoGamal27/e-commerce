import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginate } from 'src/utils/pagination.util';
import { query } from 'express';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
   const category = await this.prisma.category.findUnique({ where: { id: createProductDto.categoryId } });

   if(!category) {
    throw new HttpException('Category not found', 404);
   }
   const subCategory = await this.prisma.subCategory.findUnique({ where: { id: createProductDto.subCategoryId } });

   if(!subCategory) {
    throw new HttpException('SubCategory not found',404);
   }

   const brand = await this.prisma.brand.findUnique({ where: { id: createProductDto.brandId } });

   if(!brand) {
    throw new HttpException('Brand not found', 404);
   }

   const data = {
    ...createProductDto,
    categoryId: category.id,
    subCategoryId: subCategory.id,
    brandId: brand.id
   }

   const newProduct = await this.prisma.product.create({ data });

   return { 
    status: 'success',
    message: 'Product created successfully',
    data: newProduct
   }
  }

  findAll(query: any){
  return paginate(this.prisma, 'product',query, ['title', 'description']);
 }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new Error('Product not found');
    }
    return {
      status: 'success',
      data: product
    } 
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({ where: { id }, data: updateProductDto });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}

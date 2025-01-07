import { HttpException, Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subCategory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginate } from 'src/utils/pagination.util';
import { query } from 'express';

@Injectable()
export class SubCategoryService {
  constructor(private prisma: PrismaService) {}
  /**
   * Creates a new subcategory
   * @param createSubCategoryDto - The create subcategory DTO
   * @returns - The newly created subcategory
   * @throws - HttpException if the category does not exist
   */

  async create(createSubCategoryDto: CreateSubCategoryDto) {

    const category = await this.prisma.category.findUnique({ where: { id: createSubCategoryDto.categoryId } });

    if(!category) {
      throw new HttpException('Category not found', 404);
    }

    const newSubCategory = await this.prisma.subCategory.create({ 
      data: createSubCategoryDto,
      include: {
        category: true
      }
    });

    return {
      status: 'success',
      message: 'SubCategory created successfully',
      data: newSubCategory
    };

  }

  /**
   * Retrieves all sub-categories, paginated
   * @param query - The query parameters containing pagination information
   * @returns - An object containing the status, message and data of the sub-categories
   */
  findAll() {
    return paginate(this.prisma, 'subCategory',query, ['name']);
  }

  /**
   * Find one sub-category by id
   * @param id - The id of the sub-category
   * @returns {Object} - An object containing the status, message and data of the sub-category
   * @throws {HttpException} - If sub-category not found
   */

 async findOne(id: number) {
   const subCategory = await this.prisma.subCategory.findUnique({ 
    where: { id },
    include: {
      category: true
    }
   });

   if (!subCategory) {
     throw new HttpException('SubCategory not found', 404);
   }
 
   return {
    status: 'success',
     data: subCategory,
   }
  }

  update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.prisma.subCategory.update({ where: { id }, data: updateSubCategoryDto });
  }

  remove(id: number) {
    return this.prisma.subCategory.delete({ where: { id } });
  }
}

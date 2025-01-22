import { HttpException, Injectable } from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class TaxService {
  constructor(private prisma: PrismaService) {}
  async create(createtaxDto: CreateTaxDto) {

    const newTax = await this.prisma.tax.create({ data: createtaxDto });

    return {
      status: 'success',
      message: 'Tax created successfully',
      data: newTax
    };

  }

  async findAll() {
    const tax = await this.prisma.tax.findMany();
    return {
      status: 'success',
      data: tax
    }
  }

 async findOne(id: number) {
   const tax = await this.prisma.tax.findUnique({ where: { id } });

   if (!tax) {
     throw new HttpException('tax not found', 404);
   }
   return {
    status: 'success',
     data: tax
   }
  }

  update(id: number, updateTaxDto: UpdateTaxDto) {
    return this.prisma.tax.update({ where: { id }, data: updateTaxDto });
  }

  remove(id: number) {
    return this.prisma.tax.delete({ where: { id } });
  }
}

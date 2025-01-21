import { HttpException, Injectable } from '@nestjs/common';
import { CreateSuppliersDto } from './dto/create-suppliers.dto';
import { UpdateSuppliersDto } from './dto/update-suppliers.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}
  async create(createsuppliersDto: CreateSuppliersDto) {

    const newSuppliers = await this.prisma.suppliers.create({ data: createsuppliersDto });

    return {
      status: 'success',
      message: 'Suppliers created successfully',
      data: newSuppliers
    };

  }

  async findAll() {
    const suppliers = await this.prisma.suppliers.findMany();
    return {
      status: 'success',
      data: suppliers
    }
  }

 async findOne(id: number) {
   const suppliers = await this.prisma.suppliers.findUnique({ where: { id } });

   if (!suppliers) {
     throw new HttpException('Suppliers not found', 404);
   }
   return {
    status: 'success',
     data: suppliers
   }
  }

  update(id: number, updateSuppliersDto: UpdateSuppliersDto) {
    return this.prisma.suppliers.update({ where: { id }, data: updateSuppliersDto });
  }

  remove(id: number) {
    return this.prisma.suppliers.delete({ where: { id } });
  }
}

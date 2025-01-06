import { PrismaService } from '../prisma/prisma.service';
import { HttpException } from '@nestjs/common';

export async function paginate<T>(
  prisma: PrismaService,
  model: string,
  query: any,
  searchFields: string[] = ['name'],
  filterFields: Record<string, any> = {},
) {
  const { limit = 100, skip = 0, sort = 'asc', search, ...filters } = query;

 
  if (Number.isNaN(Number(+limit))) {
    throw new HttpException('Invalid limit', 400);
  }
  if (Number.isNaN(Number(+skip))) {
    throw new HttpException('Invalid skip', 400);
  }

  
  if (!['asc', 'desc'].includes(sort)) {
    throw new HttpException('Sort must be asc or desc', 400);
  }

  
  const where: any = {};

  
  if (search) {
    where.OR = searchFields.map((field) => ({
      [field]: { contains: search, mode: 'insensitive' },
    }));
  }

  
  for (const [key, value] of Object.entries(filters)) {
    if (value && filterFields[key]) {
      where[key] = filterFields[key](value);
    }
  }

  
  const data = await prisma[model].findMany({
    take: +limit,
    skip: +skip,
    where,
    orderBy: {
      [searchFields[0]]: sort,
    },
  });

  return {
    status: 200,
    message: 'Data fetched successfully',
    length: data.length,
    data,
  };
}
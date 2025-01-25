import { PrismaService } from '../prisma/prisma.service';
import { HttpException } from '@nestjs/common';

export async function paginate<T>(
  prisma: PrismaService,
  model: string,
  query: any,
  searchFields: string[] = [],
  filterFields: Record<string, any> = {},
) {
  const { limit = 100, skip = 0, sort = 'asc', search, ...filters } = query;

  // Validate limit and skip
  if (Number.isNaN(Number(+limit))) {
    throw new HttpException('Invalid limit', 400);
  }
  if (Number.isNaN(Number(+skip))) {
    throw new HttpException('Invalid skip', 400);
  }

  // Validate sort
  if (!['asc', 'desc'].includes(sort)) {
    throw new HttpException('Sort must be asc or desc', 400);
  }

  
  const where: any = {};

  //search functionality
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

  //ORDER BY clause as an array of objects
  const orderBy = searchFields.map((field) => ({
    [field]: sort,
  }));

  
  const data = await prisma[model].findMany({
    take: +limit,
    skip: +skip,
    where,
    orderBy, 
  });

  return {
    status: 200,
    message: 'Data fetched successfully',
    length: data.length,
    data,
  };
}
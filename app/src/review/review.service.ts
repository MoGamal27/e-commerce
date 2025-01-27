import { HttpException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}
  async create(createReviewDto: CreateReviewDto) {
   const review = await this.prisma.review.findFirst({
      where: {
        userId: createReviewDto.userId,
        productId: createReviewDto.productId,
      },
   })

   if(review) {
    throw new HttpException("You have already reviewed this product", 400);
   }

   const newReview = await this.prisma.review.create({
    data: createReviewDto,
   })

   // calc avg rating for product
    
   /*const sumIndividualRatings = await this.prisma.review.aggregate({
    where: {
      productId: createReviewDto.productId,
    },
    _sum: {
      rating: true,
    }
  })

   // count review
   const totalNumberOfRatings = await this.prisma.review.count({
    where: {
      productId: createReviewDto.productId,
    },
   })

   // calculate avg rating
   const avgRating = sumIndividualRatings._sum.rating / totalNumberOfRatings;
   */

 // more efficient way to calculate avg rating
    const aggregate = await this.prisma.review.aggregate({
    where: { productId: createReviewDto.productId },
    _sum: { rating: true },
    _count: true
  });
  
  const avgRating = aggregate._sum.rating / aggregate._count;
   
   // update product avg rating
   await this.prisma.product.update({
    where: {
      id: createReviewDto.productId,
    },
    data: {
      ratings: avgRating,
    }
   })
    
    return {
      status: 'success',
      message: "Review created successfully",
      data: newReview,
    }

   }

   async findAll() {
    const reviews = await this.prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        product: {
          select: {
            id: true,
            title: true,
            image: true,
            price: true
          }
        }
      },
    });
  
    return {
      status: 'success',
      results: reviews.length,
      data: reviews
    };
  }
  

  async findOne(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        product: {
          select: {
            id: true,
            title: true,
            image: true,
            price: true
          }
        }
      },
    });

    if (!review) {
      throw new HttpException('Review not found', 404);
    }

    return {
      status: 'success',
      data: review
    };
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.prisma.review.findUnique({
      where: { id }
    });

    if (!review) {
      throw new HttpException('Review not found', 404);
    }

    const updatedReview = await this.prisma.review.update({
      where: { id },
      data: updateReviewDto
    });

    // Recalculate average rating
    const aggregate = await this.prisma.review.aggregate({
      where: { productId: review.productId },
      _sum: { rating: true },
      _count: true
    });

    const avgRating = aggregate._sum.rating / aggregate._count;

    // Update product rating
    await this.prisma.product.update({
      where: {
        id: review.productId,
      },
      data: {
        ratings: avgRating,
      }
    });

    return {
      status: 'success',
      message: 'Review updated successfully',
      data: updatedReview
    };
  }

  async remove(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id }
    });

    if (!review) {
      throw new HttpException('Review not found', 404);
    }

    await this.prisma.review.delete({
      where: { id }
    });

    // Recalculate average rating after deletion
    const aggregate = await this.prisma.review.aggregate({
      where: { productId: review.productId },
      _sum: { rating: true },
      _count: true
    });

    const avgRating = aggregate._count === 0 ? 0 : aggregate._sum.rating / aggregate._count;

    // Update product rating
    await this.prisma.product.update({
      where: {
        id: review.productId,
      },
      data: {
        ratings: avgRating,
      }
    });

    return {
      status: 'success',
      message: 'Review deleted successfully'
    };
  }
}

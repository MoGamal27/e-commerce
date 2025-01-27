import { IsString, IsOptional, MinLength, IsNumber, MaxLength, IsNotEmpty, Min, Max } from "class-validator";

export class CreateReviewDto {
    @IsOptional()
    @IsString()
    @MinLength((3), { message: "rating text must be at least 3 characters long" })
    reviewText: string;

    @IsNotEmpty({ message: "rating is required" })
    @IsNumber()
    @Min((1), { message: "rating must be at least 1" })
    @Max((5), { message: "rating must be at most 5" })
    rating: number;

    @IsNotEmpty({ message: "productId is required" })
    @IsNumber()
    productId: number;

    @IsNotEmpty({ message: "userId is required" })
    @IsNumber()
    userId: number;
}

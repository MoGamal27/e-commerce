import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length, Max, MinLength } from "class-validator";

export class CreateProductDto {


    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    title: string;

    @IsNotEmpty({ message: 'Description is required' }) 
    @IsString({ message: 'Description must be a string' })
    @MinLength(20, { message: 'Description must be at least 20 characters long' })
    description: string;
    
    @IsNotEmpty({ message: 'Quantity is required' })
    @Length(1, 500, { message: 'Quantity must be between 1 and 500' })
    @IsNumber({}, { message: 'Quantity must be a number' })
    quantity: number;
    
    @IsNotEmpty({ message: 'image is required' })
    @IsUrl({}, { message: 'image must be a valid URL' })
    @IsOptional()
    image: string;

    @IsNumber({}, { message: 'Sold must be a number' })
    @IsOptional()
    sold: number;

    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber({}, { message: 'Price must be a number' })
    @Length(1, 20000, { message: 'Price must be between 1 and 20000' })
    price: number;

    @Max(20000, { message: 'Discount must be at least 20000' })
    @IsOptional()
    priceAfterDiscount: number;

    @IsOptional()
    color: string;

     @IsNotEmpty({ message: 'Category is required' })
    categoryId: number;

    @IsOptional()
    subCategoryId: number;

    @IsOptional()
    brandId: number;
}

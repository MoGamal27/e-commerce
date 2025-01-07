import { IsString, IsNotEmpty, MaxLength, MinLength, IsNumber} from 'class-validator';


export class CreateSubCategoryDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @MaxLength(30, { message: 'Name must be at most 30 characters long' })
    name: string

    @IsNumber({}, { message: 'CategoryId must be a number' })
    @IsNotEmpty({ message: 'CategoryId is required' })
    categoryId: number

}

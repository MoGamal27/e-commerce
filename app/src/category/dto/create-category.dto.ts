import { IsString, IsNotEmpty, MaxLength, MinLength, IsOptional, IsUrl} from 'class-validator';


export class CreateCategoryDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @MaxLength(30, { message: 'Name must be at most 30 characters long' })
    name: string

    @IsOptional()
    @IsString({ message: 'Avatar must be a string' })
    @IsUrl({}, { message: 'Avatar must be a valid URL' })
    image: string;

}

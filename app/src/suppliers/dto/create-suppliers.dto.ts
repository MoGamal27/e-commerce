import { IsString, IsNotEmpty, MaxLength, MinLength, IsUrl} from 'class-validator';


export class CreateSuppliersDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @MaxLength(100, { message: 'Name must be at most 100 characters long' })
    name: string

    @IsString({ message: 'website must be a string' })
    @IsUrl({}, { message: 'website must be a valid URL' })
    website: string;
}

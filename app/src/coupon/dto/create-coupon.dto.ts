import { IsString, IsNotEmpty, IsOptional, Length, IsNumber, IsBoolean, IsDateString} from 'class-validator';


export class CreateCouponDto {
    @IsString({ message: 'Code must be a string' })
    @IsNotEmpty({ message: 'Code is required' })
    @Length(8, 8, { message: 'Code must be 8 characters long' })
    code: string

    @IsNumber({}, { message: 'Discount must be a number' })
    @IsNotEmpty({ message: 'Discount is required' })
    discount: number

   @IsBoolean({ message: 'Is Active must be a boolean' })
   @IsOptional()
   isActive: boolean;

   @IsDateString(
    {},
    {
      message:
        'expireDate must be a valid date string in the format YYYY-MM-DD',
    },
  )
   expireDate: string
}

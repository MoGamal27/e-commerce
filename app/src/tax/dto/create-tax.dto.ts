import { IsOptional,  IsNumber} from 'class-validator';


export class CreateTaxDto {
   
    @IsOptional()
    @IsNumber({}, { message: 'Tax Price must be a number' })
    taxPrice: number;

    @IsOptional()
    @IsNumber({}, { message: 'Shipping Price must be a number' })
    shippingPrice: number;

}

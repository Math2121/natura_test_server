import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class InputCreateProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    quantity: number;


    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsUrl()
    @IsString()
    image: string;
}
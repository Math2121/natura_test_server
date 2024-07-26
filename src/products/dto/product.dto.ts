import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class InputCreateProductDto {

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsNotEmpty()
    @ApiProperty()
    quantity: number;


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsUrl()
    @IsString()
    @ApiProperty()
    image: string;
}

export class Product {
    @ApiProperty()
    id: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    name: string;
}

export class ProductPagination {

    @ApiProperty({ type:[Product] })
    data: Product[];

    @ApiProperty()
    total: number;

    @ApiProperty()
    page: number;

    
    @ApiProperty()
    pageSize: number;
}
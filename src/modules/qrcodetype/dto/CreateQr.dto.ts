import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateQrDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    link: string;

    // @IsNumber()
    // @ApiProperty()
    // scans: number ;

    // @IsNumber()
    // @ApiProperty()
    // activeDuration: number ;
 
    // @IsNotEmpty()
    // @IsString()
    // createdAt: string;

    // @IsNotEmpty()
    // @IsString()
    // @ApiProperty()
    // qrcode: string;


}
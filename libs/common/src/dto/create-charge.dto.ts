import { cardDto } from "@app/common";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsNumber, ValidateNested } from "class-validator";
import Stripe from "stripe";


export class createChargeDto {
    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested() // validate for the value that inside the cardDto
    @Type(() => cardDto) // use to convert plain js to a real js object
    card: cardDto
    @IsNumber()
    amount: number
}
import { IsCreditCard, IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class cardDto {
    @IsString()
    @IsNotEmpty()
    cvc?: string;
    @IsNumber()
    exp_month?: number;
    @IsNumber()
    exp_year?: number;
    @IsCreditCard()
    number?: string;
    // @IsString()
    // @IsIn(['cartes_bancaires', 'mastercard', 'visa'], {
    //     message: 'Payment method not allowed!'
    // })
    // networks?: string;
}
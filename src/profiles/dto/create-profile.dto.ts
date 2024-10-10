import { IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @MinLength(1)
    firstName: string;

    @IsString()
    @MinLength(1)
    lastName: string;

    @IsInt()
    @IsOptional()
    age?: number;
}

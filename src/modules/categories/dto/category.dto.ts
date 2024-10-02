import { IsNotEmpty, IsOptional } from "@nestjs/class-validator";

export class CreateCategoryDTO {
    @IsNotEmpty()
    categoryName: string;

    @IsOptional()
    description: string;
}

export class UpdateCategoryDTO {
    @IsOptional()
    categoryName: string;

    @IsOptional()
    description: string;
}
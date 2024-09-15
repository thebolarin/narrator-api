import {
    IsString,
    IsNotEmpty,
    ValidateIf,
    IsIn,
    IsEmail,
    IsNumber,
    IsOptional,
    MinLength,
    MaxLength,
    IsBoolean,
} from 'class-validator';

export class GetProjectDto {
	@IsString()
	@MinLength(24)
	@MaxLength(24)
	readonly projectId: string;
}

export class CreateProjectDto {
    @IsString({
        message: 'Research name is required.',
    })
    @IsNotEmpty()
    readonly name: String;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly description: String;

    // @IsString({
    //     message: 'Research question is required.',
    // })
    // @IsNotEmpty()
    // researchQuestion: String;
}

export class UpdateProjectDto{
    @IsOptional()
    @IsString({
        message: 'Project name is required.',
    })
    @IsNotEmpty()
    readonly name: String;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly description: String;
}
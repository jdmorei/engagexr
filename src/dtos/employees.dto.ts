import { IsString, IsEmail, IsInt, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public companyId: number;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  public phone: string;
}

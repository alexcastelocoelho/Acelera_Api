import { IsString, Length, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateAutoescolaDto {    

  @IsString()
  @MinLength(3, { message: 'Nome precisa ter no mínimo 3 caracteres' })
  nome: string;

  @IsString()
  @Length(14, 14, { message: 'CNPJ deve ter 14 caracteres' })
  @Matches(/^\d+$/, { message: 'CNPJ deve ter apenas números' })
  cnpj: string;

  @IsString()
  @MinLength(7, { message: 'Endereço precisa ter no mínimo 7 caracteres' })
  endereco: string;

  @IsString()
  @MinLength(11, { message: 'Telefone deve ter 11 dígitos (DDD + 9 + número)' })
  @MaxLength(11, { message: 'Telefone não pode ter mais que 11 dígitos' })
  @Matches(/^\d+$/, { message: 'Telefone deve ter apenas números' })
  telefone: string;
}

import {IsString,IsNotEmpty,Length,Matches,IsEnum,IsDate,MinLength,} from 'class-validator';
import { Type } from 'class-transformer';
import { Genero } from 'src/enums/Genero.enum';
import { CategoriaVeiculo } from 'src/enums/categoria-veiculo.enum';

export class CreateInstrutorDto {
  @IsString()
  @MinLength(3, { message: 'Nome precisa ter pelo menos 3 caracteres' })
  nome: string;

  @IsString()
  @Length(11, 11, { message: 'CPF deve ter 11 caracteres' })
  cpf: string;

  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })  
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,{ message: 'Data de nascimento deve estar no formato DD/MM/YYYY' },)
  dataNascimento: string;

  @IsEnum(Genero, {
    message: 'Gênero invalido, deve ser MASCULINO ou FEMININO',
  })
  genero: Genero;

  @IsString()
  @Matches(
    /^(1[1-9]|2[12478]|3[1234578]|4[1234579]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])9\d{8}$/,
    { message: 'Telefone deve possuir DDD, 9 na frente junto com o número' },
  )
  telefone: string;

  @IsEnum(CategoriaVeiculo, {
    message: 'Tipo Cnh invalido, deve ser A, B, C, D ou E',
  })
  tipoCnh: CategoriaVeiculo;
}

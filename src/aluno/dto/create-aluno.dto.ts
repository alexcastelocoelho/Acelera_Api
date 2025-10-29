import {
  IsNotEmpty,
  IsString,
  Length,
  IsDateString,
  IsEnum,
  IsEmail,
  Matches,
  MinLength,
} from 'class-validator';
import { Genero } from 'src/enums/Genero.enum';

export class CreateAlunoDto {
  @IsString()
  @Length(3, 100, { message: 'nome precisa ter no minimo 3 caracteres' })
  nome: string;

  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'Data de nascimento deve estar no formato DD/MM/YYYY',
  })
  dataNascimento: string;

  @IsNotEmpty({ message: 'Informar genero do instrutor' })
  @IsEnum(Genero, {
    message: 'Gênero inválido, pode ser MASCULINO ou FEMININO',
  })
  genero: Genero;

  @IsString()
  @Length(11, 11, { message: 'CPF deve ter 11 caracteres' })
  cpf: string;

  @IsString()
  @MinLength(7, { message: 'Endereço precisa ter no mínimo 7 caracteres' })
  endereco: string;

  @IsString()
  @Matches(
    /^(1[1-9]|2[12478]|3[1234578]|4[1234579]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])9\d{8}$/,
    { message: 'Telefone deve possuir DDD, 9 na frente junto com o número' },
  )
  telefone: string;

  @IsNotEmpty({ message: 'Informar email do aluno' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;
}

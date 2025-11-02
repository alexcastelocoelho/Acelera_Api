import { IsEnum, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { Instrutor } from 'src/entity/Instrutor.entity';
import { TipoAula } from 'src/enums/Tipo-aula.enum';

export class CreateAulaPraticaDto { 
  

  @IsNotEmpty({ message: 'informar data da aula' })
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'data deve estar no formato DD/MM/YYYY',
  })
  data: string;
   
  @IsUUID('4', { message: 'Informar o instrutor da aula' })
  instrutor: string;

  @IsNotEmpty({ message: 'informar hora da aula' })
  @IsString({ message: 'hora deve estar no formato HH:mm' })
  horaInicio: string; 
  

  @IsNotEmpty({ message: 'informar o tipo da aula' })
  @IsEnum(TipoAula, { message: 'tipo de aula invalido, pode ser CARRO ou MOTO' })
  tipoAula: TipoAula;
}

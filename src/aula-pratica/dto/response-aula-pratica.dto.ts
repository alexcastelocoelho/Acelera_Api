import { Aluno } from 'src/entity/Aluno.entity';
import { Instrutor } from 'src/entity/Instrutor.entity';
import { TipoAula } from 'src/enums/Tipo-aula.enum';

export class ResponseAulapraticaDto {
  id: string;

  data: string;

  horaInicio: string;

  horaFim: string;

  tipoAula: TipoAula;
}

export class ResponseAulapraticaInstrutorDto {
  id: string;

  data: string;
  instrutor?: Instrutor | string;
  aluno?: Aluno | string;
  horaInicio: string;

  horaFim: string;

  tipoAula: TipoAula;
}

import { TipoAula } from 'src/enums/Tipo-aula.enum';

export class ResponseAulapraticaDto {
  id: string;

  data: string;

  horaInicio: string;

  horaFim: string;

  tipoAula: TipoAula;
}

import { ResponseAulapraticaDto } from 'src/aula-pratica/dto/response-aula-pratica.dto';
import { Genero } from 'src/enums/Genero.enum';

export class ResponseAlunoDto {
  id: string;
  nome: string;
  dataNascimento: string;
  genero: Genero;
  cpf: string;
  endereco: string;
  telefone: string;
  email: string;
}

export class ResponseAlunoAulasDto {      
  id: string;
  nome: string;
  cpf: string;
  aulasPraticas: ResponseAulapraticaDto[]  
  
}


import { ResponseAulapraticaDto } from "src/aula-pratica/dto/response-aula-pratica.dto";
import { CategoriaVeiculo } from "src/enums/categoria-veiculo.enum";
import { Genero } from "src/enums/Genero.enum";

export class ResponseInstrutorDto {      
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  genero: Genero;
  telefone: string;
  tipoCnh: CategoriaVeiculo;  
}



export class ResponseInstrutorAulasDto {      
  id: string;
  nome: string;
  cpf: string;
  aulasPraticas: ResponseAulapraticaDto[]  
  
}

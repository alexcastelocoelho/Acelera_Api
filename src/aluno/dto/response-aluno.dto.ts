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

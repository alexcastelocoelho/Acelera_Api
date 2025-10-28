import { CategoriaVeiculo } from "src/enums/categoria-veiculo.enum";
import { StatusCarro } from "src/enums/status-carro.enum";
import { TipoCombustivel } from "src/enums/tipo-combustivel.enum";

export class ResponseVeiculoDto {      
  id: string;
  modelo: string;
  placa: string;
  renavam: string;
  categoriaVeiculo: CategoriaVeiculo;
  ano: number;
  tipoCombustivel: TipoCombustivel;
  statusCarro: StatusCarro;
}

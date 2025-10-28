import { IsString, IsEnum, IsInt, Min, Max, Length } from 'class-validator';
import { CategoriaVeiculo } from 'src/enums/categoria-veiculo.enum';
import { StatusCarro } from 'src/enums/status-carro.enum';
import { TipoCombustivel } from 'src/enums/tipo-combustivel.enum';

export class CreateVeiculoDto {

  @IsString()
  @Length(3, 50, { message: 'modelo precisa ter no minimo 3 caracteres' })
  modelo: string;

  @IsString()
  @Length(7, 7, { message: 'placa precisa ter 7 caracteres' })
  placa: string;

  @IsString()
  @Length(11, 11, { message: 'renavam precisa ter 11 caracteres' })
  renavam: string;

  @IsEnum(CategoriaVeiculo, { message: 'categoria do Veiculo inválida' })
  categoriaVeiculo: CategoriaVeiculo;

  @IsInt()
  @Min(1995, { message: 'ano minimo é 1995' })
  @Max(new Date().getFullYear(), {
    message: `ano não pode ser maior que o atual ${new Date().getFullYear()}`,
  })
  ano: number;

  @IsEnum(TipoCombustivel, { message: 'tipo de combustivel invalido' })
  tipoCombustivel: TipoCombustivel;

  @IsEnum(StatusCarro, { message: 'status do Carro inválido' })
  statusCarro: StatusCarro;
}

import { CategoriaVeiculo } from 'src/enums/categoria-veiculo.enum';
import { StatusCarro } from 'src/enums/status-carro.enum';
import { TipoCombustivel } from 'src/enums/tipo-combustivel.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('veiculos')
export class Veiculo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  modelo: string;

  @Column({ unique: true, length: 7 })
  placa: string;

  @Column({ unique: true, length: 11 })
  renavam: string;

  @Column({ type: 'enum', enum: CategoriaVeiculo })
  categoriaVeiculo: CategoriaVeiculo;

  @Column()
  ano: number;

  @Column({ type: 'enum', enum: TipoCombustivel })
  tipoCombustivel: TipoCombustivel;

  @Column({ type: 'enum', enum: StatusCarro })
  statusCarro: StatusCarro;
}
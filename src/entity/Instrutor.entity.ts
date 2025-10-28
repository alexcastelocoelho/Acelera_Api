import { CategoriaVeiculo } from 'src/enums/categoria-veiculo.enum';
import { Genero } from 'src/enums/Genero.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('instrutores')
export class Instrutor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: 'date' })
  dataNascimento: Date;

  @Column({
    type: 'enum',
    enum: Genero,
  })
  genero: Genero;

  @Column()
  telefone: string;

  @Column({
    type: 'enum',
    enum: CategoriaVeiculo,
  })
  tipoCnh: CategoriaVeiculo;
}

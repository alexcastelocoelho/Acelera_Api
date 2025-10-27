import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('autoescolas')
export class Autoescola {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true, length: 14 })
  cnpj: string;

  @Column()
  endereco: string;

  @Column()
  telefone: string;
}

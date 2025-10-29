import {  Entity,PrimaryGeneratedColumn,Column,Unique,} from 'typeorm';
import { Genero } from 'src/enums/Genero.enum';


@Entity('alunos')
export class Aluno {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  nome: string;

  @Column({ type: 'date', nullable: false }) 
  dataNascimento: Date;

  @Column({ type: 'enum', enum: Genero})
  genero: Genero;

  @Column({unique: true})  
  cpf: string;

  @Column()
  endereco: string;

  @Column()
  telefone: string;

  @Column()
  email: string;
}

import { TipoAula } from 'src/enums/Tipo-aula.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  
} from 'typeorm';
import { Instrutor } from './Instrutor.entity';
import { Aluno } from './Aluno.entity';

@Entity('aulas_praticas')
export class AulaPratica {  
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column({ type: 'date' })
  data: Date;

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFim: string;

  @Column({
    type: 'enum',
    enum: TipoAula,
  })
  tipoAula: TipoAula;

   @ManyToOne(() => Instrutor, instrutor => instrutor.aulasPraticas, {    
    onDelete: 'SET NULL'
  })
  instrutor: Instrutor;

   @ManyToOne(() => Aluno, (aluno) => aluno.aulasPraticas, {
    onDelete: 'SET NULL', 
  })
  aluno: Aluno;
}

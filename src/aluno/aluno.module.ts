import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from 'src/entity/Aluno.entity';
import { AulaPratica } from 'src/entity/AulaPratica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno, AulaPratica])],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}

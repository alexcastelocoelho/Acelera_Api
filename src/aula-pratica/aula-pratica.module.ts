import { Module } from '@nestjs/common';
import { AulaPraticaService } from './aula-pratica.service';
import { AulaPraticaController } from './aula-pratica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AulaPratica } from 'src/entity/AulaPratica.entity';
import { Instrutor } from 'src/entity/Instrutor.entity';
import { Aluno } from 'src/entity/Aluno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AulaPratica, Instrutor, Aluno])],
  controllers: [AulaPraticaController],
  providers: [AulaPraticaService],
})
export class AulaPraticaModule {}

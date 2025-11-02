import { Module } from '@nestjs/common';
import { AulaPraticaService } from './aula-pratica.service';
import { AulaPraticaController } from './aula-pratica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AulaPratica } from 'src/entity/AulaPratica.entity';
import { Instrutor } from 'src/entity/Instrutor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AulaPratica, Instrutor])],
  controllers: [AulaPraticaController],
  providers: [AulaPraticaService],
})
export class AulaPraticaModule {}

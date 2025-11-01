import { Module } from '@nestjs/common';
import { AulaPraticaService } from './aula-pratica.service';
import { AulaPraticaController } from './aula-pratica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AulaPratica } from 'src/entity/AulaPratica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AulaPratica])],
  controllers: [AulaPraticaController],
  providers: [AulaPraticaService],
})
export class AulaPraticaModule {}

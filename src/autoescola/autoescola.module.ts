import { Module } from '@nestjs/common';
import { AutoescolaService } from './autoescola.service';
import { AutoescolaController } from './autoescola.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autoescola } from 'src/entity/Autoescola.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Autoescola])],
  controllers: [AutoescolaController],
  providers: [AutoescolaService],
})
export class AutoescolaModule {}

import { Module } from '@nestjs/common';
import { InstrutorService } from './instrutor.service';
import { InstrutorController } from './instrutor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrutor } from 'src/entity/Instrutor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instrutor])],
  controllers: [InstrutorController],
  providers: [InstrutorService],
})
export class InstrutorModule {}

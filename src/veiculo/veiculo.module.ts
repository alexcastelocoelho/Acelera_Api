import { Module } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import { Veiculo } from 'src/entity/Veiculo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Veiculo])],
  controllers: [VeiculoController],
  providers: [VeiculoService],
})
export class VeiculoModule {}

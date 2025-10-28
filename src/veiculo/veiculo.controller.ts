import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Controller('veiculos')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post()
  @HttpCode(201)
  async criarVeiculo(@Body() createVeiculoDto: CreateVeiculoDto) {
    await this.veiculoService.create(createVeiculoDto);
  }

  @Get()
  @HttpCode(200)
  listarVeiculos() {
    return this.veiculoService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  listarUmVeiculo(@Param('id') id: string) {
    return this.veiculoService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(204)
  atualizarVeiculo(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculoService.update(id, updateVeiculoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deletarVeiculo(@Param('id') id: string) {
    return this.veiculoService.remove(id);
  }
}

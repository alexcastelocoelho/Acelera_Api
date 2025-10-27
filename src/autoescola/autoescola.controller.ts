import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { AutoescolaService } from './autoescola.service';
import { CreateAutoescolaDto } from './dto/create-autoescola.dto';
import { UpdateAutoescolaDto } from './dto/update-autoescola.dto';

@Controller('autoescolas')
export class AutoescolaController {
  constructor(private readonly autoescolaService: AutoescolaService) {}

  @Post()
  @HttpCode(201)
  async criarAutoescola(@Body() createAutoescolaDto: CreateAutoescolaDto) {
    await this.autoescolaService.create(createAutoescolaDto);
  }

  @Get()
  @HttpCode(200)
  listarAutoescolas() {
    return this.autoescolaService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  listarUmaAutoescola(@Param('id') id: string) {
    return this.autoescolaService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(204)
  atualizarAutoescola(@Param('id') id: string, @Body() updateAutoescolaDto: UpdateAutoescolaDto) {
    return this.autoescolaService.update(id, updateAutoescolaDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deletarAutoescola(@Param('id') id: string) {
    return this.autoescolaService.delete(id);
  }
}

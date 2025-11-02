import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AulaPraticaService } from './aula-pratica.service';
import { CreateAulaPraticaDto } from './dto/create-aula-pratica.dto';
import { UpdateAulaPraticaDto } from './dto/update-aula-pratica.dto';

@Controller('aula-praticas')
export class AulaPraticaController {
  constructor(private readonly aulaPraticaService: AulaPraticaService) {}

  @Post()
  @HttpCode(201)
  async criarAulaPratica(@Body() createAulaPraticaDto: CreateAulaPraticaDto) {
    await this.aulaPraticaService.create(createAulaPraticaDto);
  }

  @Get()
  @HttpCode(200)
  listarAulasPraticas() {
    return this.aulaPraticaService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  listarUmaAulaPratica(@Param('id') id: string) {
    return this.aulaPraticaService.findOne(id);
  }

   
  @Post(':aulaId/matricular/:alunoId')
  @HttpCode(200)
  matricularAlunoAula(@Param('aulaId') aulaId: string,@Param('alunoId') alunoId: string,
  ) {
    return this.aulaPraticaService.matricularAlunoAula(aulaId, alunoId);
  }

  @Patch(':id')
  @HttpCode(204)
  atualizarAulaPratica(@Param('id') id: string, @Body() updateAulaPraticaDto: UpdateAulaPraticaDto) {
    return this.aulaPraticaService.update(id, updateAulaPraticaDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deletarAulaPratica(@Param('id') id: string) {
    return this.aulaPraticaService.remove(id);
  }
}

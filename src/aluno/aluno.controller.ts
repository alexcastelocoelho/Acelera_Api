import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  @HttpCode(201)
  async criarAluno(@Body() createAlunoDto: CreateAlunoDto) {
    await this.alunoService.create(createAlunoDto);
  }

  @Get()
  @HttpCode(200)
  listarAlunos() {
    return this.alunoService.findAll();
  }

  @Get(":id/aulas")
  @HttpCode(200)
  listarAulasAlunos(@Param('id') id: string) {
    return this.alunoService.listarAulasAluno(id);
  }

  @Get(':id')
  @HttpCode(200)
  listarUmAluno(@Param('id') id: string) {
    return this.alunoService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(204)
  atualizarAluno(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunoService.update(id, updateAlunoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deletarAluno(@Param('id') id: string) {
    return this.alunoService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { InstrutorService } from './instrutor.service';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';
import { UpdateInstrutorDto } from './dto/update-instrutor.dto';

@Controller('instrutores')
export class InstrutorController {
  constructor(private readonly instrutorService: InstrutorService) {}

  @Post()
   @HttpCode(201)
  async criarInstrutor(@Body() createInstrutorDto: CreateInstrutorDto) {
    await this.instrutorService.create(createInstrutorDto);
  }

  @Get()
  @HttpCode(200)
  listarInstrutores() {
    return this.instrutorService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  listarUmInstrutor(@Param('id') id: string) {
    return this.instrutorService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(204)
  atualizarInstrutor(@Param('id') id: string, @Body() updateInstrutorDto: UpdateInstrutorDto) {
    return this.instrutorService.update(id, updateInstrutorDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deletarInstrutor(@Param('id') id: string) {
    return this.instrutorService.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from 'src/entity/Aluno.entity';
import { Repository } from 'typeorm';
import { ConflictError } from 'src/errors/Conflict.Exception';
import { validaCPF } from 'src/utils/ValidaCpf';
import { BadRequestError } from 'src/errors/Badrequest.exception';
import { ResponseAlunoDto } from './dto/response-aluno.dto';
import { format, toZonedTime } from 'date-fns-tz';
import { validate } from 'uuid';
import { NotFoundError } from 'src/errors/Notfound.exception';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  private async existsByCpf(cpf: string): Promise<void> {
    const exists = await this.alunoRepository.findOne({
      select: ['id'],
      where: { cpf },
    });
    if (exists) {
      throw new ConflictError('Cpf já registrado');
    }
  }

  async create(createAlunoDto: CreateAlunoDto) {
    if (!validaCPF(createAlunoDto.cpf)) {
      throw new BadRequestError('Cpf invalido');
    }

    await this.existsByCpf(createAlunoDto.cpf);

    const aluno = this.alunoRepository.create(createAlunoDto);

    await this.alunoRepository.save(aluno);
  }

  async findAll(): Promise<ResponseAlunoDto[]> {
    const alunos = await this.alunoRepository.find();
    const alunosResponse: ResponseAlunoDto[] = alunos.map((aluno) => ({
      id: aluno.id,
      nome: aluno.nome,
      dataNascimento: format(toZonedTime(aluno.dataNascimento, 'UTC'),'dd/MM/yyyy',),
      genero: aluno.genero,
      cpf: aluno.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4',),
      endereco: aluno.endereco,
      telefone: aluno.telefone,
      email: aluno.email,
    }));

    return alunosResponse
  }

  async findOne(id: string) {
        if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const aluno = await this.alunoRepository.findOneBy({ id });

    if (!aluno) {
      throw new NotFoundError('aluno não localizado');
    }
    const alunoResponse: ResponseAlunoDto = {
      id: aluno.id,
      nome: aluno.nome,
      dataNascimento: format(toZonedTime(aluno.dataNascimento, 'UTC'),'dd/MM/yyyy',),
      genero: aluno.genero,
      cpf: aluno.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4',),
      endereco: aluno.endereco,
      telefone: aluno.telefone,
      email: aluno.email,
    };

    return alunoResponse;
  }

  async update(id: string, updateAlunoDto: UpdateAlunoDto) {
     if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const aluno = await this.alunoRepository.findOneBy({ id });

    if (!aluno) {
      throw new NotFoundError('aluno não localizado');
    }

    this.alunoRepository.merge(aluno, updateAlunoDto);
    await this.alunoRepository.save(aluno);
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const aluno = await this.alunoRepository.findOneBy({ id });

    if (!aluno) {
      throw new NotFoundError('aluno não localizado');
    }

    await this.alunoRepository.remove(aluno);
    
  }
}

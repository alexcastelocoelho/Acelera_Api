import { Injectable } from '@nestjs/common';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';
import { UpdateInstrutorDto } from './dto/update-instrutor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instrutor } from 'src/entity/Instrutor.entity';
import { Repository } from 'typeorm';
import { ResponseInstrutorDto } from './dto/response-instrutor.dto';
import { validaCPF } from 'src/utils/ValidaCpf';
import { BadRequestError } from 'src/errors/Badrequest.exception';
import { validate } from 'uuid';
import { NotFoundError } from 'src/errors/Notfound.exception';
import { toZonedTime, format } from 'date-fns-tz';
import { ConflictError } from 'src/errors/Conflict.Exception';

@Injectable()
export class InstrutorService {
  constructor(
    @InjectRepository(Instrutor)
    private readonly instrutorRepository: Repository<Instrutor>,
  ) {}

  private async existsByCpf(cpf: string): Promise<void> {
    const exists = await this.instrutorRepository.findOne({
      select: ['id'],
      where: { cpf },
    });
    if (exists) {
      throw new ConflictError('Cpf já registrado');
    }
  }

  async create(createInstrutorDto: CreateInstrutorDto) {
    if (!validaCPF(createInstrutorDto.cpf)) {
      throw new BadRequestError('Cpf invalido');
    }
    await this.existsByCpf(createInstrutorDto.cpf);

    const instrutor = this.instrutorRepository.create(createInstrutorDto);

    await this.instrutorRepository.save(instrutor);
  }

  async findAll(): Promise<ResponseInstrutorDto[]> {
    const instrutores = await this.instrutorRepository.find();
    const instrutoresResponse: ResponseInstrutorDto[] = instrutores.map(
      (instrutor) => ({
        id: instrutor.id,
        nome: instrutor.nome,
        cpf: instrutor.cpf.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          '$1.$2.$3-$4',
        ),
        dataNascimento: format(
          toZonedTime(instrutor.dataNascimento, 'UTC'),
          'dd/MM/yyyy',
        ),
        genero: instrutor.genero,
        telefone: instrutor.telefone,
        tipoCnh: instrutor.tipoCnh,
      }),
    );

    return instrutoresResponse;
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const instrutor = await this.instrutorRepository.findOneBy({ id });

    if (!instrutor) {
      throw new NotFoundError('instrutor não localizado');
    }
    const instrutorResponse: ResponseInstrutorDto = {
      id: instrutor.id,
      nome: instrutor.nome,
      cpf: instrutor.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
      dataNascimento: format(toZonedTime(instrutor.dataNascimento, 'UTC'),'dd/MM/yyyy',),
      genero: instrutor.genero,
      telefone: instrutor.telefone,
      tipoCnh: instrutor.tipoCnh,
    };

    return instrutorResponse;
  }

  async update(id: string, updateInstrutorDto: UpdateInstrutorDto) {
    if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const instrutor = await this.instrutorRepository.findOneBy({ id });

    if (!instrutor) {
      throw new NotFoundError('instrutor não localizado');
    }

    this.instrutorRepository.merge(instrutor, updateInstrutorDto);
    await this.instrutorRepository.save(instrutor);
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const instrutor = await this.instrutorRepository.findOneBy({ id });

    if (!instrutor) {
      throw new NotFoundError('instrutor não localizado');
    }

    await this.instrutorRepository.remove(instrutor);
  }
}

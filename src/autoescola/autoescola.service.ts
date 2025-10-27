import { Injectable } from '@nestjs/common';
import { CreateAutoescolaDto } from './dto/create-autoescola.dto';
import { UpdateAutoescolaDto } from './dto/update-autoescola.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Autoescola } from 'src/entity/Autoescola.entity';
import { Repository } from 'typeorm';
import { ResponseAutoescolaDto } from './dto/response-autoescola.dto';
import { NotFoundError } from 'src/errors/Notfound.exception';
import { validate } from 'uuid';
import { BadRequestError } from 'src/errors/Badrequest.exception';
import { ConflictError } from 'src/errors/Conflict.Exception';

@Injectable()
export class AutoescolaService {
  constructor(
    @InjectRepository(Autoescola)
    private readonly autoescolaRepository: Repository<Autoescola>,
  ) {}

  private async existsByCnpj(cnpj: string): Promise<void> {
    const exists = await this.autoescolaRepository.findOne({select: ['id'],where: { cnpj },});
    if (exists) {
      throw new ConflictError('CNPJ já registrado no sistema');
    }
  }


  async create(createAutoescolaDto: CreateAutoescolaDto) {
    await this.existsByCnpj(createAutoescolaDto.cnpj)

    const autoescola = this.autoescolaRepository.create(createAutoescolaDto);

    await this.autoescolaRepository.save(autoescola);
  }

  async findAll(): Promise<ResponseAutoescolaDto[]> {
    const autoescolas = await this.autoescolaRepository.find();

    const autoescolasResponse: ResponseAutoescolaDto[] = autoescolas.map(
      (autoescola) => ({
        id: autoescola.id,
        nome: autoescola.nome,
        cnpj: autoescola.cnpj,
        endereco: autoescola.endereco,
        telefone: autoescola.telefone,
      }),
    );

    return autoescolasResponse;
  }

  async findOne(id: string): Promise<ResponseAutoescolaDto> {
    if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const autoescola = await this.autoescolaRepository.findOneBy({ id });
    if (!autoescola) {
      throw new NotFoundError('autoescola não localizada');
    }
    const autoescolaResponse: ResponseAutoescolaDto = {
      id: autoescola!.id,
      nome: autoescola!.nome,
      cnpj: autoescola!.cnpj,
      endereco: autoescola!.endereco,
      telefone: autoescola!.telefone,
    };

    return autoescolaResponse;
  }

  async update(id: string, updateAutoescolaDto: UpdateAutoescolaDto) {
    if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const autoescola = await this.autoescolaRepository.findOneBy({ id });

    if (!autoescola) {
      throw new NotFoundError('autoescola não localizada');
    }

    this.autoescolaRepository.merge(autoescola, updateAutoescolaDto);
    await this.autoescolaRepository.save(autoescola);
  }

  async delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const autoescola = await this.autoescolaRepository.findOneBy({ id });

    if (!autoescola) {
      throw new NotFoundError('autoescola não localizada');
    }

    await this.autoescolaRepository.remove(autoescola);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateAulaPraticaDto } from './dto/create-aula-pratica.dto';
import { UpdateAulaPraticaDto } from './dto/update-aula-pratica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AulaPratica } from 'src/entity/AulaPratica.entity';
import { Repository } from 'typeorm';
import { addMinutes, format, parse } from 'date-fns';
import { ResponseAulapraticaDto } from './dto/response-aula-pratica.dto';
import { toZonedTime } from 'date-fns-tz';
import { validate } from 'uuid';
import { BadRequestError } from 'src/errors/Badrequest.exception';
import { NotFoundError } from 'src/errors/Notfound.exception';
import { Instrutor } from 'src/entity/Instrutor.entity';

@Injectable()
export class AulaPraticaService {
  constructor(
    @InjectRepository(AulaPratica)
    private readonly aulaPraticaRepository: Repository<AulaPratica>,
    @InjectRepository(Instrutor)
    private readonly instrutorRepository: Repository<Instrutor>,
  ) {}

  async create(createAulaPraticaDto: CreateAulaPraticaDto) {

     const instrutor = await this.instrutorRepository.findOne({
      where: { id: createAulaPraticaDto.instrutor },
    });

    if (!instrutor) {
      throw new NotFoundError('Instrutor não encontrado');
    }
    const aulaPratica = this.aulaPraticaRepository.create({
      data: createAulaPraticaDto.data,
      instrutor: instrutor,
      horaInicio: createAulaPraticaDto.horaInicio,
      tipoAula: createAulaPraticaDto.tipoAula    
    });

    if (aulaPratica.horaInicio) {
      const horaInicioDate = parse(aulaPratica.horaInicio, 'HH:mm', new Date());
      const horaFinalDate = addMinutes(horaInicioDate, 50);
      aulaPratica.horaFim = format(horaFinalDate, 'HH:mm');
    }

    await this.aulaPraticaRepository.save(aulaPratica);
  }

  async findAll(): Promise<ResponseAulapraticaDto[]> {
    const aulasPraticas = await this.aulaPraticaRepository.find();
    const aulasPraticasResponse: ResponseAulapraticaDto[] = aulasPraticas.map(
      (aulaPratica) => ({
        id: aulaPratica.id,
        data: format(toZonedTime(aulaPratica.data, 'UTC'), 'dd/MM/yyyy'),
        horaInicio: aulaPratica.horaInicio,
        horaFim: aulaPratica.horaFim,
        tipoAula: aulaPratica.tipoAula,
      }),
    );

    return aulasPraticasResponse;
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const aulaPratica = await this.aulaPraticaRepository.findOneBy({ id });

    if (!aulaPratica) {
      throw new NotFoundError('aula pratica não localizada');
    }
    const aulaPraticaResponse: ResponseAulapraticaDto = {
      id: aulaPratica.id,
      data: format(toZonedTime(aulaPratica.data, 'UTC'), 'dd/MM/yyyy'),
      horaInicio: aulaPratica.horaInicio,
      horaFim: aulaPratica.horaFim,
      tipoAula: aulaPratica.tipoAula,
    };

    return aulaPraticaResponse;
  }

  // async update(id: string, updateAulaPraticaDto: UpdateAulaPraticaDto) {
  //   if (!validate(id)) {
  //     throw new BadRequestError('Valor do id invalido ou longo demais');
  //   }

  //   const aulaPratica = await this.aulaPraticaRepository.findOneBy({ id });

  //   if (!aulaPratica) {
  //     throw new NotFoundError('aula pratica não localizada');
  //   }
    
  //   this.aulaPraticaRepository.merge(aulaPratica, updateAulaPraticaDto);

  //   if (updateAulaPraticaDto.horaInicio) {
  //     const horaInicioDate = parse(updateAulaPraticaDto.horaInicio, 'HH:mm', new Date());
  //     const horaFinalDate = addMinutes(horaInicioDate, 50);
  //     aulaPratica.horaFim = format(horaFinalDate, 'HH:mm');
  //   }

  //   await this.aulaPraticaRepository.save(aulaPratica);
  // }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const aulaPratica = await this.aulaPraticaRepository.findOneBy({ id });

    if (!aulaPratica) {
      throw new NotFoundError('aula pratica não localizada');
    }

    await this.aulaPraticaRepository.remove(aulaPratica);
  }
}

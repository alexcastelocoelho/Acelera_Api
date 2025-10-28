import { Injectable } from '@nestjs/common';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { Veiculo } from 'src/entity/Veiculo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseVeiculoDto } from './dto/response-veiculo.dto';
import { validate } from 'uuid';
import { BadRequestError } from 'src/errors/Badrequest.exception';
import { NotFoundError } from 'src/errors/Notfound.exception';
import { ConflictError } from 'src/errors/Conflict.Exception';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private readonly veiculoRepository: Repository<Veiculo>,
  ) {}

  private async existsByPlaca(placa: string): Promise<void> {
      const exists = await this.veiculoRepository.findOne({select: ['id'],where: { placa },});
      if (exists) {
        throw new ConflictError('Placa já registrada');
        
      }
    }

     private async existsByRenavam(renavam: string): Promise<void> {
      const exists = await this.veiculoRepository.findOne({select: ['id'],where: { renavam },});
      if (exists) {
        throw new ConflictError('Renavam já registrado');
        
      }
    }

  async create(createVeiculoDto: CreateVeiculoDto) {
    await this.existsByPlaca(createVeiculoDto.placa)
    
    await this.existsByRenavam(createVeiculoDto.renavam)

    const veiculo = this.veiculoRepository.create(createVeiculoDto);

    await this.veiculoRepository.save(veiculo);
  }

  async findAll(): Promise<ResponseVeiculoDto[]> {
    const veiculos = await this.veiculoRepository.find();

    const veiculosResponse: ResponseVeiculoDto[] = veiculos.map((veiculo) => ({
      id: veiculo.id,
      modelo: veiculo.modelo,
      placa: veiculo.placa,
      renavam: veiculo.renavam,
      categoriaVeiculo: veiculo.categoriaVeiculo,
      ano: veiculo.ano,
      tipoCombustivel: veiculo.tipoCombustivel,
      statusCarro: veiculo.statusCarro,
    }));

    return veiculosResponse
  }

  async findOne(id: string): Promise<ResponseVeiculoDto> {
    if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const veiculo = await this.veiculoRepository.findOneBy({ id });

    if (!veiculo) {
      throw new NotFoundError('veiculo não localizado');
    }
    const veiculoResponse: ResponseVeiculoDto = {
      id: veiculo.id,
      modelo: veiculo.modelo,
      placa: veiculo.placa,
      renavam: veiculo.renavam,
      categoriaVeiculo: veiculo.categoriaVeiculo,
      ano: veiculo.ano,
      tipoCombustivel: veiculo.tipoCombustivel,
      statusCarro: veiculo.statusCarro,
    };

    return veiculoResponse;
  }

  async update(id: string, updateVeiculoDto: UpdateVeiculoDto) {
    
      if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const veiculo = await this.veiculoRepository.findOneBy({ id });

    if (!veiculo) {
      throw new NotFoundError('veiculo não localizado');
    }

    this.veiculoRepository.merge(veiculo, updateVeiculoDto);
    await this.veiculoRepository.save(veiculo);
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestError('Valor do id invalido ou longo demais');
    }

    const veiculo = await this.veiculoRepository.findOneBy({ id });

    if (!veiculo) {
      throw new NotFoundError('veiculo não localizado');
    }

    await this.veiculoRepository.remove(veiculo);
  }
}

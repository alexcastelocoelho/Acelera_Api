import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateInstrutorDto } from './create-instrutor.dto';

export class UpdateInstrutorDto extends PartialType(
    OmitType(CreateInstrutorDto, ["cpf", "dataNascimento"] as const)
) {}

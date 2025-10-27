import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAutoescolaDto } from './create-autoescola.dto';

export class UpdateAutoescolaDto extends PartialType(
    OmitType(CreateAutoescolaDto, ["cnpj"] as const)
) {}

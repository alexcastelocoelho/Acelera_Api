import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAulaPraticaDto } from './create-aula-pratica.dto';

export class UpdateAulaPraticaDto extends PartialType(
    OmitType(CreateAulaPraticaDto, ["data"] as const)
) {}

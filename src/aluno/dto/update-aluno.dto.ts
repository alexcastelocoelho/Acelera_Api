import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAlunoDto } from './create-aluno.dto';

export class UpdateAlunoDto extends PartialType(
    OmitType(CreateAlunoDto, ["cpf", "dataNascimento"] as const)
) {}

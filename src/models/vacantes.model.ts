import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Requisitos} from './requisitos.model';

@model()
export class Vacantes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  cargalaboral: string;

  @property({
    type: 'string',
    required: true,
  })
  salario: string;

  @belongsTo(() => Requisitos)
  requisitosId: string;

  constructor(data?: Partial<Vacantes>) {
    super(data);
  }
}

export interface VacantesRelations {
  // describe navigational properties here
}

export type VacantesWithRelations = Vacantes & VacantesRelations;

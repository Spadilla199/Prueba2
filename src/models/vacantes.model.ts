import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Vacantes>) {
    super(data);
  }
}

export interface VacantesRelations {
  // describe navigational properties here
}

export type VacantesWithRelations = Vacantes & VacantesRelations;

import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vacantes} from './vacantes.model';

@model()
export class Requisitos extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  edad: number;


  @property({
    type: 'string',
    required: true,
  })
  experiencia: string;

  @property({
    type: 'string',
    required: true,
  })
  estudios: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasMany(() => Vacantes)
  vacantes: Vacantes[];

  constructor(data?: Partial<Requisitos>) {
    super(data);
  }
}

export interface RequisitosRelations {
  // describe navigational properties here
}

export type RequisitosWithRelations = Requisitos & RequisitosRelations;

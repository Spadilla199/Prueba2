import {Entity, model, property, hasMany} from '@loopback/repository';
import {Aspirante} from './aspirante.model';

@model()
export class Validacion extends Entity {
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
  requisitos: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  requisitosaprobados: string;

  @hasMany(() => Aspirante)
  aspirantes: Aspirante[];

  constructor(data?: Partial<Validacion>) {
    super(data);
  }
}

export interface ValidacionRelations {
  // describe navigational properties here
}

export type ValidacionWithRelations = Validacion & ValidacionRelations;

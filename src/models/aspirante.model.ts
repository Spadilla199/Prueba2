import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Validacion} from './validacion.model';

@model({settings: {strict: false}})
export class Aspirante extends Entity {
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
  y: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @property({
    type: 'string',
    required: true,
  })
  estadocivil: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  educacion: string;

  @property({
    type: 'string',
    required: true,
  })
  ID: string;

  @belongsTo(() => Validacion)
  validacionId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Aspirante>) {
    super(data);
  }
}

export interface AspiranteRelations {
  // describe navigational properties here
}

export type AspiranteWithRelations = Aspirante & AspiranteRelations;

import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Validacion,
  Aspirante,
} from '../models';
import {ValidacionRepository} from '../repositories';

export class ValidacionAspiranteController {
  constructor(
    @repository(ValidacionRepository) protected validacionRepository: ValidacionRepository,
  ) { }

  @get('/validacions/{id}/aspirantes', {
    responses: {
      '200': {
        description: 'Array of Validacion has many Aspirante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aspirante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Aspirante>,
  ): Promise<Aspirante[]> {
    return this.validacionRepository.aspirantes(id).find(filter);
  }

  @post('/validacions/{id}/aspirantes', {
    responses: {
      '200': {
        description: 'Validacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aspirante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Validacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aspirante, {
            title: 'NewAspiranteInValidacion',
            exclude: ['id'],
            optional: ['validacionId']
          }),
        },
      },
    }) aspirante: Omit<Aspirante, 'id'>,
  ): Promise<Aspirante> {
    return this.validacionRepository.aspirantes(id).create(aspirante);
  }

  @patch('/validacions/{id}/aspirantes', {
    responses: {
      '200': {
        description: 'Validacion.Aspirante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aspirante, {partial: true}),
        },
      },
    })
    aspirante: Partial<Aspirante>,
    @param.query.object('where', getWhereSchemaFor(Aspirante)) where?: Where<Aspirante>,
  ): Promise<Count> {
    return this.validacionRepository.aspirantes(id).patch(aspirante, where);
  }

  @del('/validacions/{id}/aspirantes', {
    responses: {
      '200': {
        description: 'Validacion.Aspirante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Aspirante)) where?: Where<Aspirante>,
  ): Promise<Count> {
    return this.validacionRepository.aspirantes(id).delete(where);
  }
}

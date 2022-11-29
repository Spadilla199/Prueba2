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
  Requisitos,
  Vacantes,
} from '../models';
import {RequisitosRepository} from '../repositories';

export class RequisitosVacantesController {
  constructor(
    @repository(RequisitosRepository) protected requisitosRepository: RequisitosRepository,
  ) { }

  @get('/requisitos/{id}/vacantes', {
    responses: {
      '200': {
        description: 'Array of Requisitos has many Vacantes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vacantes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vacantes>,
  ): Promise<Vacantes[]> {
    return this.requisitosRepository.vacantes(id).find(filter);
  }

  @post('/requisitos/{id}/vacantes', {
    responses: {
      '200': {
        description: 'Requisitos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vacantes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Requisitos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacantes, {
            title: 'NewVacantesInRequisitos',
            exclude: ['id'],
            optional: ['requisitosId']
          }),
        },
      },
    }) vacantes: Omit<Vacantes, 'id'>,
  ): Promise<Vacantes> {
    return this.requisitosRepository.vacantes(id).create(vacantes);
  }

  @patch('/requisitos/{id}/vacantes', {
    responses: {
      '200': {
        description: 'Requisitos.Vacantes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacantes, {partial: true}),
        },
      },
    })
    vacantes: Partial<Vacantes>,
    @param.query.object('where', getWhereSchemaFor(Vacantes)) where?: Where<Vacantes>,
  ): Promise<Count> {
    return this.requisitosRepository.vacantes(id).patch(vacantes, where);
  }

  @del('/requisitos/{id}/vacantes', {
    responses: {
      '200': {
        description: 'Requisitos.Vacantes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vacantes)) where?: Where<Vacantes>,
  ): Promise<Count> {
    return this.requisitosRepository.vacantes(id).delete(where);
  }
}

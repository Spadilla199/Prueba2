import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Vacantes} from '../models';
import {VacantesRepository} from '../repositories';

export class VacantesController {
  constructor(
    @repository(VacantesRepository)
    public vacantesRepository : VacantesRepository,
  ) {}

  @post('/vacantes')
  @response(200, {
    description: 'Vacantes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vacantes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacantes, {
            title: 'NewVacantes',
            exclude: ['id'],
          }),
        },
      },
    })
    vacantes: Omit<Vacantes, 'id'>,
  ): Promise<Vacantes> {
    return this.vacantesRepository.create(vacantes);
  }

  @get('/vacantes/count')
  @response(200, {
    description: 'Vacantes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vacantes) where?: Where<Vacantes>,
  ): Promise<Count> {
    return this.vacantesRepository.count(where);
  }

  @get('/vacantes')
  @response(200, {
    description: 'Array of Vacantes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vacantes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vacantes) filter?: Filter<Vacantes>,
  ): Promise<Vacantes[]> {
    return this.vacantesRepository.find(filter);
  }

  @patch('/vacantes')
  @response(200, {
    description: 'Vacantes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacantes, {partial: true}),
        },
      },
    })
    vacantes: Vacantes,
    @param.where(Vacantes) where?: Where<Vacantes>,
  ): Promise<Count> {
    return this.vacantesRepository.updateAll(vacantes, where);
  }

  @get('/vacantes/{id}')
  @response(200, {
    description: 'Vacantes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vacantes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vacantes, {exclude: 'where'}) filter?: FilterExcludingWhere<Vacantes>
  ): Promise<Vacantes> {
    return this.vacantesRepository.findById(id, filter);
  }

  @patch('/vacantes/{id}')
  @response(204, {
    description: 'Vacantes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacantes, {partial: true}),
        },
      },
    })
    vacantes: Vacantes,
  ): Promise<void> {
    await this.vacantesRepository.updateById(id, vacantes);
  }

  @put('/vacantes/{id}')
  @response(204, {
    description: 'Vacantes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vacantes: Vacantes,
  ): Promise<void> {
    await this.vacantesRepository.replaceById(id, vacantes);
  }

  @del('/vacantes/{id}')
  @response(204, {
    description: 'Vacantes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vacantesRepository.deleteById(id);
  }
}

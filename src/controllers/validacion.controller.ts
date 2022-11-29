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
import {Validacion} from '../models';
import {ValidacionRepository} from '../repositories';

export class ValidacionController {
  constructor(
    @repository(ValidacionRepository)
    public validacionRepository : ValidacionRepository,
  ) {}

  @post('/validacions')
  @response(200, {
    description: 'Validacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Validacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Validacion, {
            title: 'NewValidacion',
            exclude: ['id'],
          }),
        },
      },
    })
    validacion: Omit<Validacion, 'id'>,
  ): Promise<Validacion> {
    return this.validacionRepository.create(validacion);
  }

  @get('/validacions/count')
  @response(200, {
    description: 'Validacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Validacion) where?: Where<Validacion>,
  ): Promise<Count> {
    return this.validacionRepository.count(where);
  }

  @get('/validacions')
  @response(200, {
    description: 'Array of Validacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Validacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Validacion) filter?: Filter<Validacion>,
  ): Promise<Validacion[]> {
    return this.validacionRepository.find(filter);
  }

  @patch('/validacions')
  @response(200, {
    description: 'Validacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Validacion, {partial: true}),
        },
      },
    })
    validacion: Validacion,
    @param.where(Validacion) where?: Where<Validacion>,
  ): Promise<Count> {
    return this.validacionRepository.updateAll(validacion, where);
  }

  @get('/validacions/{id}')
  @response(200, {
    description: 'Validacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Validacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Validacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Validacion>
  ): Promise<Validacion> {
    return this.validacionRepository.findById(id, filter);
  }

  @patch('/validacions/{id}')
  @response(204, {
    description: 'Validacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Validacion, {partial: true}),
        },
      },
    })
    validacion: Validacion,
  ): Promise<void> {
    await this.validacionRepository.updateById(id, validacion);
  }

  @put('/validacions/{id}')
  @response(204, {
    description: 'Validacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() validacion: Validacion,
  ): Promise<void> {
    await this.validacionRepository.replaceById(id, validacion);
  }

  @del('/validacions/{id}')
  @response(204, {
    description: 'Validacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.validacionRepository.deleteById(id);
  }
}

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
import {Aspirante} from '../models';
import {AspiranteRepository} from '../repositories';

export class AspiranteController {
  constructor(
    @repository(AspiranteRepository)
    public aspiranteRepository : AspiranteRepository,
  ) {}

  @post('/aspirantes')
  @response(200, {
    description: 'Aspirante model instance',
    content: {'application/json': {schema: getModelSchemaRef(Aspirante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aspirante, {
            title: 'NewAspirante',
            exclude: ['id'],
          }),
        },
      },
    })
    aspirante: Omit<Aspirante, 'id'>,
  ): Promise<Aspirante> {
    return this.aspiranteRepository.create(aspirante);
  }

  @get('/aspirantes/count')
  @response(200, {
    description: 'Aspirante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Aspirante) where?: Where<Aspirante>,
  ): Promise<Count> {
    return this.aspiranteRepository.count(where);
  }

  @get('/aspirantes')
  @response(200, {
    description: 'Array of Aspirante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Aspirante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Aspirante) filter?: Filter<Aspirante>,
  ): Promise<Aspirante[]> {
    return this.aspiranteRepository.find(filter);
  }

  @patch('/aspirantes')
  @response(200, {
    description: 'Aspirante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aspirante, {partial: true}),
        },
      },
    })
    aspirante: Aspirante,
    @param.where(Aspirante) where?: Where<Aspirante>,
  ): Promise<Count> {
    return this.aspiranteRepository.updateAll(aspirante, where);
  }

  @get('/aspirantes/{id}')
  @response(200, {
    description: 'Aspirante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Aspirante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Aspirante, {exclude: 'where'}) filter?: FilterExcludingWhere<Aspirante>
  ): Promise<Aspirante> {
    return this.aspiranteRepository.findById(id, filter);
  }

  @patch('/aspirantes/{id}')
  @response(204, {
    description: 'Aspirante PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aspirante, {partial: true}),
        },
      },
    })
    aspirante: Aspirante,
  ): Promise<void> {
    await this.aspiranteRepository.updateById(id, aspirante);
  }

  @put('/aspirantes/{id}')
  @response(204, {
    description: 'Aspirante PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() aspirante: Aspirante,
  ): Promise<void> {
    await this.aspiranteRepository.replaceById(id, aspirante);
  }

  @del('/aspirantes/{id}')
  @response(204, {
    description: 'Aspirante DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.aspiranteRepository.deleteById(id);
  }
}

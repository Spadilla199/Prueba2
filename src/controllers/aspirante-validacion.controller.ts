import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Aspirante,
  Validacion,
} from '../models';
import {AspiranteRepository} from '../repositories';

export class AspiranteValidacionController {
  constructor(
    @repository(AspiranteRepository)
    public aspiranteRepository: AspiranteRepository,
  ) { }

  @get('/aspirantes/{id}/validacion', {
    responses: {
      '200': {
        description: 'Validacion belonging to Aspirante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Validacion)},
          },
        },
      },
    },
  })
  async getValidacion(
    @param.path.string('id') id: typeof Aspirante.prototype.id,
  ): Promise<Validacion> {
    return this.aspiranteRepository.validacion(id);
  }
}

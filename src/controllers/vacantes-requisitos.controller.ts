import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vacantes,
  Requisitos,
} from '../models';
import {VacantesRepository} from '../repositories';

export class VacantesRequisitosController {
  constructor(
    @repository(VacantesRepository)
    public vacantesRepository: VacantesRepository,
  ) { }

  @get('/vacantes/{id}/requisitos', {
    responses: {
      '200': {
        description: 'Requisitos belonging to Vacantes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Requisitos)},
          },
        },
      },
    },
  })
  async getRequisitos(
    @param.path.string('id') id: typeof Vacantes.prototype.id,
  ): Promise<Requisitos> {
    return this.vacantesRepository.requisitos(id);
  }
}

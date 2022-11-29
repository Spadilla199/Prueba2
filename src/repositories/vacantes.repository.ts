import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Vacantes, VacantesRelations, Requisitos} from '../models';
import {RequisitosRepository} from './requisitos.repository';

export class VacantesRepository extends DefaultCrudRepository<
  Vacantes,
  typeof Vacantes.prototype.id,
  VacantesRelations
> {

  public readonly requisitos: BelongsToAccessor<Requisitos, typeof Vacantes.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('RequisitosRepository') protected requisitosRepositoryGetter: Getter<RequisitosRepository>,
  ) {
    super(Vacantes, dataSource);
    this.requisitos = this.createBelongsToAccessorFor('requisitos', requisitosRepositoryGetter,);
    this.registerInclusionResolver('requisitos', this.requisitos.inclusionResolver);
  }
}

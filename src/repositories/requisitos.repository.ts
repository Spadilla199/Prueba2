import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Requisitos, RequisitosRelations, Vacantes} from '../models';
import {VacantesRepository} from './vacantes.repository';

export class RequisitosRepository extends DefaultCrudRepository<
  Requisitos,
  typeof Requisitos.prototype.id,
  RequisitosRelations
> {

  public readonly vacantes: HasManyRepositoryFactory<Vacantes, typeof Requisitos.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('VacantesRepository') protected vacantesRepositoryGetter: Getter<VacantesRepository>,
  ) {
    super(Requisitos, dataSource);
    this.vacantes = this.createHasManyRepositoryFactoryFor('vacantes', vacantesRepositoryGetter,);
    this.registerInclusionResolver('vacantes', this.vacantes.inclusionResolver);
  }
}

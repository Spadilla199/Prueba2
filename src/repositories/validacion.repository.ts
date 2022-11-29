import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Validacion, ValidacionRelations, Aspirante} from '../models';
import {AspiranteRepository} from './aspirante.repository';

export class ValidacionRepository extends DefaultCrudRepository<
  Validacion,
  typeof Validacion.prototype.id,
  ValidacionRelations
> {

  public readonly aspirantes: HasManyRepositoryFactory<Aspirante, typeof Validacion.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('AspiranteRepository') protected aspiranteRepositoryGetter: Getter<AspiranteRepository>,
  ) {
    super(Validacion, dataSource);
    this.aspirantes = this.createHasManyRepositoryFactoryFor('aspirantes', aspiranteRepositoryGetter,);
    this.registerInclusionResolver('aspirantes', this.aspirantes.inclusionResolver);
  }
}

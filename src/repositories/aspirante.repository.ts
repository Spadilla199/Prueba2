import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Aspirante, AspiranteRelations, Validacion} from '../models';
import {ValidacionRepository} from './validacion.repository';

export class AspiranteRepository extends DefaultCrudRepository<
  Aspirante,
  typeof Aspirante.prototype.id,
  AspiranteRelations
> {

  public readonly validacion: BelongsToAccessor<Validacion, typeof Aspirante.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('ValidacionRepository') protected validacionRepositoryGetter: Getter<ValidacionRepository>,
  ) {
    super(Aspirante, dataSource);
    this.validacion = this.createBelongsToAccessorFor('validacion', validacionRepositoryGetter,);
    this.registerInclusionResolver('validacion', this.validacion.inclusionResolver);
  }
}

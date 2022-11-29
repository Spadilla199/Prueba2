import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Aspirante, AspiranteRelations} from '../models';

export class AspiranteRepository extends DefaultCrudRepository<
  Aspirante,
  typeof Aspirante.prototype.id,
  AspiranteRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Aspirante, dataSource);
  }
}

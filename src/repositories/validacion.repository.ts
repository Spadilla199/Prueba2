import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Validacion, ValidacionRelations} from '../models';

export class ValidacionRepository extends DefaultCrudRepository<
  Validacion,
  typeof Validacion.prototype.id,
  ValidacionRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Validacion, dataSource);
  }
}

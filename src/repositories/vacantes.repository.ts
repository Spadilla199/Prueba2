import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Vacantes, VacantesRelations} from '../models';

export class VacantesRepository extends DefaultCrudRepository<
  Vacantes,
  typeof Vacantes.prototype.id,
  VacantesRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Vacantes, dataSource);
  }
}

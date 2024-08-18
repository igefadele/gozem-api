/* 
==============
PACKAGE CONTROLLER
==============
*/

import { Request, Response } from 'express';
import * as br from '../../../core/repositories/base.repository';
import { EntityKey } from '../../../core/enums';
import { IPackage } from '../models/package.model';
import { ResponseHandler } from '../../../core/models/response_handler';
import { PACKAGE_ID } from '../../../core/constants';



/// FIND ALL PACKAGES: 
/// Fetch all packages in the database
export const findAll = async (req: Request, res: Response) => {
  const response: ResponseHandler = await br.findAll(EntityKey.package);
  res.status(response.statusCode).json(response)
}

/// FIND BY PACKAGE_ID
/// Fetch a single package from the database using the package_id
export const findOne = async (req: Request, res: Response) => {
  const package_id = req.params.id;
  const filter: object = {[PACKAGE_ID]: package_id};
  const response: ResponseHandler = await br.findOne(EntityKey.package, filter);
  res.status(response.statusCode).json(response);
}

/// CREAT ONE
/// Create a package record in the database
export const create = async (req: Request, res: Response) => {
  const data: IPackage = req.body;
  const response: ResponseHandler = await br.create(EntityKey.package, data);
  res.status(response.statusCode).json(response);
}

/// UPDATE A DEVELIERY
/// Update a package record in the database
export const updateOne = async (req: Request, res: Response) => {
  const data: IPackage = req.body;
  const package_id = req.params.id;
  const filter: object = {[PACKAGE_ID]: package_id};
  const response: ResponseHandler = await br.updateOne({
    key: EntityKey.package,
    filter: filter,
    dataToUpdate: data, 
  });
  /// ToDo: Implement and uncomment when required
  //const packageData: IPackage = response.data as IPackage;
  //broadcastPackageUpdateEvent(packageData); 
  res.status(response.statusCode).json(response);
}


/// UPDATE BY PACKAGE_ID (GUID/UUID)
/// Update a package record in the database using its package_id as identifier
export const updateInPart = async (package_id: string, dataToUpdate: object) => {
  const filter: object = {[PACKAGE_ID]: package_id};
  const response: ResponseHandler = await br.updateOne({
    key: EntityKey.package,
    filter: filter,
    dataToUpdate: dataToUpdate 
  });
  /// ToDo: Implement and uncomment when required
  // const packageData: IPackage = response.data as IPackage;
  //broadcastPackageUpdateEvent(packageData); 
}

/// DELETE BY ID
/// Delete a package record from the database using its uid as identifier
export const deleteOne = async (req: Request, res: Response) => {
  const package_id = req.params.id;
  const filter: object = {[PACKAGE_ID]: package_id};
  const response: ResponseHandler = await br.deleteOne(EntityKey.package, filter);
  res.status(response.statusCode).json(response);
}

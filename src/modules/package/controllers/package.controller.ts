/* 
==============
PACKAGE CONTROLLER
==============
*/

import express from 'express';
import { Request, Response } from 'express';
import { hasEmptyFields } from '../../../core/utils';
import * as br from '../../../core/repositories/base.repository'; // br = baseRepository
import { EntityKey } from '../../../core/enums';
import { IPackage, PackageModel } from '../models/package.model';
import { ResponseHandler } from '../../../core/models/response_handler';


/// FIND ALL
/// Fetch all packages in the database
export const findAll = async (req: Request, res: Response) => {
  const response: ResponseHandler = await br.findAll(EntityKey.package);
  res.status(response.statusCode).json(response)
}

/// FIND BY ID
/// Fetch a single package from the database using the package uid
export const findById = async (req: Request, res: Response) => {
  const response: ResponseHandler = await br.findById(EntityKey.package, req.params.id);
  res.status(response.statusCode).json(response)
}

/// CREAT ONE
/// Create a package record in the database
export const create = async (req: Request, res: Response) => {
  const data: IPackage = req.body;
  const response: ResponseHandler = await br.create(EntityKey.package, req.body);
  res.status(response.statusCode).json(response)
}

/// UPDATE BY ID
/// Update a package record in the database using its uid as identifier
export const update = async (req: Request, res: Response) => {
  const data: IPackage = req.body;
  const response: ResponseHandler = await br.update(EntityKey.package, req.params.id, req.body);
  res.status(response.statusCode).json(response)
}

/// DELETE BY ID
/// Delete a package record from the database using its uid as identifier
export const remove = async (req: Request, res: Response) => {
  const response: ResponseHandler = await br.remove(EntityKey.package, req.params.id);
  res.status(response.statusCode).json(response)
}


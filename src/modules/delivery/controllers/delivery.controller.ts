/* 
==============
DELIVERY CONTROLLER
==============
*/

import { Request, Response } from 'express';
import * as br from '../../../core/repositories/base.repository';
import { EntityKey } from '../../../core/enums';
import { IDelivery } from '../models/delivery.model';
import { ResponseHandler } from '../../../core/models/response_handler';
import { broadcastDeliveryUpdateEvent } from '../../../core/websocket/websocket';



/// FIND ALL: 
/// Fetch all deliveries in the database
export const findAll = async (req: Request, res: Response) => {
  const response: ResponseHandler = await br.findAll(EntityKey.delivery);
  res.status(response.statusCode).json(response)
}

/// FIND BY ID
/// Fetch a single delivery from the database using the delivery uid
export const findById = async (req: Request, res: Response) => {
  const response: ResponseHandler = await br.findById(EntityKey.delivery, req.params.id);
  res.status(response.statusCode).json(response);
}

/// CREAT ONE
/// Create a delivery record in the database
export const create = async (req: Request, res: Response) => {
  const data: IDelivery = req.body;
  const response: ResponseHandler = await br.create(EntityKey.delivery, req.body);
  res.status(response.statusCode).json(response);
}

/// UPDATE BY ID
/// Update a delivery record in the database using its uid as identifier
export const update = async (req: Request, res: Response) => {
  const data: IDelivery = req.body;
  const response: ResponseHandler = await br.update({
    key: EntityKey.delivery,
    id: req.params.id,
    dataToUpdate: req.body 
  });
  const deliveryData: IDelivery = response.data as IDelivery;
  broadcastDeliveryUpdateEvent(deliveryData);
  res.status(response.statusCode).json(response);
}

/// DELETE BY ID
/// Delete a delivery record from the database using its uid as identifier
export const remove = async (req: Request, res: Response) => {
  const response: ResponseHandler = await br.remove(EntityKey.delivery, req.params.id);
  res.status(response.statusCode).json(response);
}

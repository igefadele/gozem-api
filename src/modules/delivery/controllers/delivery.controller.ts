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
import { DELIVERY_ID } from '../../../core/constants';



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

/// UPDATE BY OBJECTID (_id)
/// Update a delivery record in the database using its ObjectId as identifier
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


/// UPDATE BY DELIVERY_ID (GUID/UUID)
/// Update a delivery record in the database using its delivery_id as identifier
export const updateByDeliveryId = async (delivery_id: string, dataToUpdate: object) => {
  const query: object = {[DELIVERY_ID]: delivery_id};
  const response: ResponseHandler = await br.updateByQuery({
    key: EntityKey.delivery,
    query: query,
    dataToUpdate: dataToUpdate 
  });
  const deliveryData: IDelivery = response.data as IDelivery;
  console.log("updateByDeliveryId => deliveryData:", deliveryData);
  broadcastDeliveryUpdateEvent(deliveryData);
}

/// DELETE BY ID
/// Delete a delivery record from the database using its uid as identifier
export const remove = async (req: Request, res: Response) => {
  const response: ResponseHandler = await br.remove(EntityKey.delivery, req.params.id);
  res.status(response.statusCode).json(response);
}

/* 
==============
DELIVERY CONTROLLER
==============
*/

import { Request, Response } from 'express';
import * as br from '../../../data/repositories/base.repository';
import { EntityKey } from '../../../data/enums';
import { IDelivery } from '../models/delivery.model';
import { ResponseHandler } from '../../../data/models/response_handler';
import { broadcastDeliveryUpdateEvent } from '../../../data/websocket/websocket';
import { DELIVERY_ID } from '../../../core/constants';



/// FIND ALL DELIVERIES: 
/// Fetch all deliveries in the database
export const findAll = async (req: Request, res: Response) => {
  const response: ResponseHandler = await br.findAll(EntityKey.delivery);
  res.status(response.statusCode).json(response)
}

/// FIND BY DELIVERY_ID
/// Fetch a single delivery from the database using the delivery_id
export const findOne = async (req: Request, res: Response) => {
  const delivery_id = req.params.id;
  const filter: object = {[DELIVERY_ID]: delivery_id};
  const response: ResponseHandler = await br.findOne(EntityKey.delivery, filter);
  res.status(response.statusCode).json(response);
}

/// CREAT ONE
/// Create a delivery record in the database
export const create = async (req: Request, res: Response) => {
  const data: IDelivery = req.body;
  const response: ResponseHandler = await br.create(EntityKey.delivery, data);
  res.status(response.statusCode).json(response);
}

/// UPDATE A DEVELIERY
/// Update a delivery record in the database
export const updateOne = async (req: Request, res: Response) => {
  const data: IDelivery = req.body;
  const delivery_id = req.params.id;
  const filter: object = {[DELIVERY_ID]: delivery_id};
  const response: ResponseHandler = await br.updateOne({
    key: EntityKey.delivery,
    filter: filter,
    dataToUpdate: data, 
  });
  const deliveryData: IDelivery = response.data as IDelivery;
  broadcastDeliveryUpdateEvent(deliveryData);
  res.status(response.statusCode).json(response);
}


/// UPDATE BY DELIVERY_ID (GUID/UUID)
/// Update a delivery record in the database using its delivery_id as identifier
export const updateInPart = async (delivery_id: string, dataToUpdate: object) => {
  const filter: object = {[DELIVERY_ID]: delivery_id};
  const response: ResponseHandler = await br.updateOne({
    key: EntityKey.delivery,
    filter: filter,
    dataToUpdate: dataToUpdate 
  });
  const deliveryData: IDelivery = response.data as IDelivery;
  broadcastDeliveryUpdateEvent(deliveryData);
}

/// DELETE BY ID
/// Delete a delivery record from the database using its uid as identifier
export const deleteOne = async (req: Request, res: Response) => {
  const delivery_id = req.params.id;
  const filter: object = {[DELIVERY_ID]: delivery_id};
  const response: ResponseHandler = await br.deleteOne(EntityKey.delivery, filter);
  res.status(response.statusCode).json(response);
}

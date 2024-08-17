/**  
==============
WEBSOCKET METHODS
*/

import { DeliveryEventPayload, DeliveryUpdatedPayload } from '../models/ws_events_models';
import { IDelivery } from '../../modules/delivery/models/delivery.model';
import { DeliveryStatus, WsEventType } from '../enums';
import { io } from '../../configs/socketio.config';
import * as deliveryController from '../../modules/delivery/controllers/delivery.controller';

/** 
 * ==== HANDLE INCOMING EVENTS: 
 * Function to handle incoming events (location_changed, status_changed)
*/

export const handleIncomingEvent = (payload: DeliveryEventPayload) => {
  io.on(payload.event, async () => {
  //io.on(payload.event, (data) => {
    //const payload: DeliveryEventPayload = JSON.parse(data.toString());
    switch (payload.event) {
      case WsEventType.location_changed:
       await deliveryController.updateByDeliveryId(payload.delivery_id, {location: payload.location});
        break;
      case WsEventType.status_changed:
        updateStatus(payload.delivery_id, payload.status);
        break;
    }
  });
}

/**  
 * ==== UPDATE DELIVERY STATUS: 
 * Function to update the status of a delivery and set appropriate time fields
*/

const updateStatus = async (delivery_id: string, status: string) => {
  console.log(`Updating status for delivery ${delivery_id} to ${status}`);
  const currentTime = new Date();
  switch (status) {
    case DeliveryStatus.pickedUp:
      await deliveryController.updateByDeliveryId(delivery_id, {pickup_time: currentTime});
      break;
    case DeliveryStatus.inTransit:
      await deliveryController.updateByDeliveryId(delivery_id, {start_time: currentTime});
      break;
    case DeliveryStatus.delivered:
    case DeliveryStatus.failed:
      await deliveryController.updateByDeliveryId(delivery_id, {end_time: currentTime});
      break;
  }
};

/**  
 * ==== BROADCAST DELIVERY UPDATE EVENT: 
 * Function to broadcast delivery updates to all connected clients
*/

export const broadcastDeliveryUpdateEvent = (delivery: IDelivery) => {
  const payload: DeliveryUpdatedPayload = {
    event: WsEventType.delivery_updated,
    delivery_object: delivery,
  };
  io.emit(payload.event, JSON.stringify(payload, null, 2));
};




/**  
==============
WEBSOCKET METHODS
*/

import { DeliveryIncomingEventPayload, DeliveryUpdatedPayload, LocationChangedPayload, StatusChangedPayload } from '../models/ws_events_models';
import { IDelivery } from '../../modules/delivery/models/delivery.model';
import { DeliveryStatus, IncomingWsEventType, WsEventType } from '../enums';
import { io } from '../../configs/socketio.config';
import * as deliveryController from '../../modules/delivery/controllers/delivery.controller';
import { Socket } from 'socket.io';
import { UNHANDLED_WS_EVENT_TYPE, UNKNOWN_INCOMING_WS_EVENT_TYPE } from '../constants';

/** 
 * ==== HANDLE INCOMING EVENTS: 
 * Function to handle incoming events (location_changed, status_changed)
*/

export const handleIncomingEvent = (socket: Socket) => {
  let payload: DeliveryIncomingEventPayload;
  const incomingEventList: IncomingWsEventType[] = Object.values(IncomingWsEventType);
  socket.onAny(async (event: IncomingWsEventType, data: DeliveryIncomingEventPayload) => {
    if (incomingEventList.includes(event)) {
      switch (event) {
        case IncomingWsEventType.location_changed:
          payload = data as LocationChangedPayload; 
          await deliveryController.updateInPart(payload.delivery_id, { location: payload.location });
          break;
        case IncomingWsEventType.status_changed:
          payload = data as StatusChangedPayload; 
          await updateStatus(payload.delivery_id, payload.status);
          break;
        default:
          console.warn(`${UNHANDLED_WS_EVENT_TYPE}: ${event}`);
          break;
      }
    } else {
      console.warn(`${UNKNOWN_INCOMING_WS_EVENT_TYPE}: ${event}`);
    }
  });
};

/**  
 * ==== UPDATE DELIVERY STATUS: 
 * Function to update the status of a delivery and set appropriate time fields
*/

const updateStatus = async (delivery_id: string, status: string) => {
  const currentTime = new Date();
  switch (status) {
    case DeliveryStatus.pickedUp:
      await deliveryController.updateInPart(delivery_id, {pickup_time: currentTime});
      break;
    case DeliveryStatus.inTransit:
      await deliveryController.updateInPart(delivery_id, {start_time: currentTime});
      break;
    case DeliveryStatus.delivered:
    case DeliveryStatus.failed:
      await deliveryController.updateInPart(delivery_id, {end_time: currentTime});
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




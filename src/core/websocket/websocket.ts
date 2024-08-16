import { WebSocketServer } from 'ws';
import { DeliveryEventPayload, DeliveryUpdatedPayload } from '../models/ws_events_models';
import { IDelivery } from '../../modules/delivery/models/delivery.model';
import { DeliveryStatus, WsEventType } from '../enums';
import { CONNECTION, MESSAGE } from '../constants';
import { io } from '../../configs/socketio.config';


// Function to handle incoming events (location_changed, status_changed)
export const handleIncomingEvent = (event: string) => {
  io.on(event, (data) => {
    const payload: DeliveryEventPayload = JSON.parse(data.toString());
    switch (payload.event) {
      case WsEventType.location_changed:
        updateLocation(payload.delivery_id, payload.location);
        break;
      case WsEventType.status_changed:
        updateStatus(payload.delivery_id, payload.status);
        break;
    }
  });
}

// Function to update the location of a delivery
const updateLocation = (delivery_id: string, location: string) => {
  console.log(`Updating location for delivery ${delivery_id} to ${location}`);
  // Code to update location
};

// Function to update the status of a delivery and set appropriate time fields
const updateStatus = (delivery_id: string, status: string) => {
  console.log(`Updating status for delivery ${delivery_id} to ${status}`);
  const currentTime = new Date();
  switch (status) {
    case DeliveryStatus.pickedUp:
      setPickupTime(delivery_id, currentTime);
      break;
    case DeliveryStatus.inTransit:
      setStartTime(delivery_id, currentTime);
      break;
    case DeliveryStatus.delivered:
    case DeliveryStatus.failed:
      setEndTime(delivery_id, currentTime);
      break;
  }
};

// Functions to set specific time fields
const setPickupTime = (delivery_id: string, time: Date) => {
  console.log(`Setting pickup time for delivery ${delivery_id}`);
  // Code to set pickup_time
};

const setStartTime = (delivery_id: string, time: Date) => {
  console.log(`Setting start time for delivery ${delivery_id}`);
  // Code to set start_time
};

const setEndTime = (delivery_id: string, time: Date) => {
  console.log(`Setting end time for delivery ${delivery_id}`);
  // Code to set end_time
};

// Function to broadcast delivery updates to all connected clients
export const broadcastDeliveryUpdate = (delivery: IDelivery) => {
  const payload: DeliveryUpdatedPayload = {
    event: WsEventType.delivery_updated,
    delivery_object: delivery,
  };
  io.emit(MESSAGE, JSON.stringify(payload));
};



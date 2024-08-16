/** 
==============
WEBSOCKET EVENTS PAYLOADS DATA MODELS
*/

import { IDelivery } from '../../modules/delivery/models/delivery.model';

/** Data model for the location_changed event payload */
export interface LocationChangedPayload {
    event: "location_changed";
    delivery_id: string;
    location: string;
}

/** Data model for the status_changed event payload */
export interface StatusChangedPayload {
    event: "status_changed";
    delivery_id: string;
    status: string;
}
/** Data model for the delivery_updated event payload */
export interface DeliveryUpdatedPayload {
    event: "delivery_updated";
    delivery_object: IDelivery;
}

/** Encapsulating Payload data model type for the three possible event payloads */
export type DeliveryEventPayload = LocationChangedPayload | StatusChangedPayload | DeliveryUpdatedPayload;


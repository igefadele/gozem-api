/* 
===============
DELIVERY ENTITY
===============
/// Data Model for the Delivery Entity
*/

import { DeliveryStatus } from "../../../core/enums";
import { LocationModel } from "../../../core/models/location.model";

class DeliveryEntity {
  delivery_id?: string;
  package_id?: string;
  pickup_time?: Date; // timestamp
  start_time?: Date;  //timestamp
  end_time?: Date;  // timestamp
  location?: LocationModel; 
  status?: DeliveryStatus;
  
  
  constructor(data: Partial<DeliveryEntity>) {
    Object.assign(this, data)
  };
}




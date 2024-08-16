/* 
===============
DELIVERY MODEL
===============
/// Data Model for the Delivery Entity
*/

import { DeliveryStatus } from "../../../core/enums";
import { LocationModel, locationSchema } from "../../../core/models/location.model";
import { Schema, model, Document } from 'mongoose';
import { validateGuid } from "../../../core/utils/validators";

export interface IDelivery extends Document {
  delivery_id: string;
  package_id: string;
  pickup_time: Date; // timestamp
  start_time: Date;  //timestamp
  end_time: Date;  // timestamp
  location: LocationModel; 
  status: string;
}

const deliverySchema = new Schema<IDelivery>({
  delivery_id: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateGuid,
      message: '{VALUE} is not a valid GUID',
    },
  },
  package_id: {
    type: String,
    required: true,
  },
  pickup_time: {
    type: Date,
    required: true,
  }, // timestamp
  start_time: {
    type: Date,
    required: true,
  }, // timestamp
  end_time: {
    type: Date,
    required: true,
  }, // timestamp
  location: {
    type: locationSchema,
    required: true,
  }, 
  status: {
    type: String,
    enum: Object.values(DeliveryStatus),
    required: true,
  },
});

export const DeliveryModel = model('Delivery', deliverySchema);
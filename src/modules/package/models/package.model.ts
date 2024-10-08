/* 
==============
PACKAGE MODEL
==============
/// Data Model for the Package Entity
*/

import { ILocation, locationSchema } from "../../../data/models/location.model";
import { Schema, model, Document } from 'mongoose';
import { validateGuid } from "../../../core/utils/validators";

export interface IPackage extends Document {
  package_id: string;
  active_delivery_id?: string;
  description: string;
  weight: number; // grams (Integer)
  width: number; // cm (Integer)
  height: number; // cm (Integer)
  depth: number; // cm (Integer)
  from_name: string;
  from_address: string;
  from_location: ILocation;
  to_name: string;
  to_address: string;
  to_location: ILocation;
}


const packageSchema = new Schema<IPackage>({
  package_id: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateGuid,
      message: '{VALUE} is not a valid GUID',
    },
  },
  active_delivery_id: {
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,  
      message: '{VALUE} is not an integer value',
    },
  }, // grams
  width: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,  
      message: '{VALUE} is not an integer value',
    },
  },  // cm
  height: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,  
      message: '{VALUE} is not an integer value',
  }, }, // cm
  depth: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,  
      message: '{VALUE} is not an integer value',
    },
  },  // cm
  from_name: {
    type: String,
    required: true
  },
  from_address: {
    type: String,
    required: true
  },
  from_location: {
    type: locationSchema,
    required: true
  }, 
  to_name: {
    type: String,
    required: true
  },
  to_address: {
    type: String,
    required: true
  },
  to_location: {
    type: locationSchema,
    required: true
  },   
});


export const PackageModel = model('Package', packageSchema);

/** 
==================
LOCATION MODEL
*/

import { Schema } from "mongoose";

export interface ILocation {
  lat: number;
  lng: number
}

export const locationSchema = new Schema<ILocation>({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});
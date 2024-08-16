import { Schema } from "mongoose";

export interface LocationModel {
  lat: number;
  lng: number
}

export const locationSchema = new Schema<LocationModel>({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});
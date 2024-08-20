/* 
==================
BASE HELPERS
*/

import { Model } from "mongoose";
import { IDelivery, DeliveryModel } from "../../modules/delivery/models/delivery.model";
import { PackageModel } from "../../modules/package/models/package.model";
import { EntityKey } from "../../data/enums";

interface BaseEntity extends Document {
  _id: string;
}

/** ==== GET MONGOOSE MODEL: 
Get the Mongoose Model for the Entity which its enum key is provided */
export function getEntityModel(key: EntityKey): Model<any>{
  switch (key) {
    case EntityKey.delivery:
      return DeliveryModel;
      break;
    case EntityKey.package:
      return PackageModel;
      break;
    default:
      throw new Error(`====\n\ngetEntityModel Instance: Invalid EntityKey key: ${key}\n\n====`);
  }
}
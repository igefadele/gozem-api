/* 
==============
PACKAGE ENTITY
==============
/// Data Model for the Package Entity
*/

import { LocationModel } from "../../../core/models/location.model";

class PackageEntity {
  package_id?: string;
  active_delivery_id?: string;
  description?: string;
  weight?: number; //grams
  width?: number; //cm
  height?: number; // cm
  depth?: number; // cm
  from_name?: string;
  from_address?: string;
  from_location?: LocationModel;
  to_name?: string;
  to_address?: string;
  to_location?: LocationModel;
  
  
  constructor(data: Partial<PackageEntity>) {
    Object.assign(this, data)
  };
}




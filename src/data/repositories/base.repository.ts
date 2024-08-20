/** 
==============
BASE REPOSITORY
==============
*/

import { HydratedDocument, Model } from "mongoose";
import { EntityKey } from "../enums";
import { getEntityModel } from "../../core/helpers";
import { ResponseHandler } from "../models/response_handler";
import { DOC_CREATED, DOC_DELETED, DOC_UPDATED, INTERNAL_SERVER_ERROR, OK, SUCCESS } from "../../core/constants";
import ld from 'lodash';
import { BaseEntityType } from "../models/base_entity.model";

/** 
* ==== FIND ALL: 
* Find all documents in a collection  
*/
export async function findAll(key: EntityKey) {
  try {
    const model = getEntityModel(key);
    const list: Document[] = await model.find();
    return new ResponseHandler({
      statusCode: 200,
      code: OK,
      message: SUCCESS,
      timestamp: new Date().toISOString(),
      data: list,
    })
  } catch (e: any) {
    return new ResponseHandler({
      statusCode: 500,
      code: ld.isString(e.code) ? e.code : ''+e.code,
      message: e.message,
      timestamp: new Date().toISOString(),
      data: {message: INTERNAL_SERVER_ERROR}
    });
  }
}

/** ==== FIND SOME: 
* Find all documents in a collection that mathces a filter 
*/
export async function findSome(key: EntityKey, filter: object) {
  try {
    const model = getEntityModel(key);
    const list: Document[] = await model.find(filter);
    return new ResponseHandler({
      statusCode: 200,
      code: OK,
      message: SUCCESS,
      timestamp: new Date().toISOString(),
      data: list,
    })
  } catch (e: any) {
    return new ResponseHandler({
      statusCode: 500,
      code: ld.isString(e.code) ? e.code : ''+e.code,
      message: e.message,
      timestamp: new Date().toISOString(),
      data: {message: INTERNAL_SERVER_ERROR}
    });
  }
}

/** 
* ==== FIND ONE:  
* Find a document that matches a provided filter in a collection 
*/
export async function findOne(key: EntityKey, filter: object) {
  try {
    const model = getEntityModel(key);
    const result = await model.findOne(filter);
      return new ResponseHandler({
        statusCode: 200,
        code: OK,
        message: SUCCESS,
        timestamp: new Date().toISOString(),
        data: result,
      });
  } catch (e: any) {
    return new ResponseHandler({
      statusCode: 500,
      code: ld.isString(e.code) ? e.code : ''+e.code,
      message: e.message,
      timestamp: new Date().toISOString(),
      data: {message: INTERNAL_SERVER_ERROR}
    });
  }
}



/** 
* ==== CREATE ONE: 
* Create a new document in a collection  
*/
export async function create(key: EntityKey, dataToSave: BaseEntityType) {
  try {
    const model: Model<any>  = getEntityModel(key);
    const doc: HydratedDocument<BaseEntityType> = new model(dataToSave);
    const result: BaseEntityType = await doc.save();
    return new ResponseHandler({
      statusCode: 201,
      code: OK,
      message: DOC_CREATED,
      timestamp: new Date().toISOString(),
      data: result,
    });
  } catch (e: any) {
    return new ResponseHandler({
      statusCode: 500,
      code: ld.isString(e.code) ? e.code : ''+e.code,
      message: e.message,
      timestamp: new Date().toISOString(),
      data: {message: INTERNAL_SERVER_ERROR}
    });
  }
}

/** 
* ==== UPDATE ONE:  
* Update a document that matches a provided filter in a collection 
*/
export async function updateOne(data: {key: EntityKey, filter: object, dataToUpdate: object}) {
  try {
    const model = getEntityModel(data.key);
    const result = await model.findOneAndUpdate(data.filter, data.dataToUpdate, { new: true });
      return new ResponseHandler({
        statusCode: 201,
        code: OK,
        message: DOC_UPDATED,
        timestamp: new Date().toISOString(),
        data: result,
      });
  } catch (e: any) {
    return new ResponseHandler({
      statusCode: 500,
      code: ld.isString(e.code) ? e.code : ''+e.code,
      message: e.message,
      timestamp: new Date().toISOString(),
      data: {message: INTERNAL_SERVER_ERROR}
    });
  }
}


/** 
* ==== REMOVE/DELETE ONE: 
* Delete/Remove a document from a collection  
*/
export async function deleteOne(key: EntityKey, filter: object) {
  try {
    const model = getEntityModel(key);
    const result = await model.findOneAndDelete(filter);
    return new ResponseHandler({
      statusCode: 201,
      code: OK,
      message: DOC_DELETED,
      timestamp: new Date().toISOString(),
      data: {message: DOC_DELETED},
    });
  } catch (e: any) {
    return new ResponseHandler({
      statusCode: 500,
      code: ld.isString(e.code) ? e.code : ''+e.code,
      message: e.message,
      timestamp: new Date().toISOString(),
      data: {message: INTERNAL_SERVER_ERROR}
    });
  }
}
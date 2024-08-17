/* 
==============
BASE REPOSITORY
==============
*/

import { HydratedDocument, Model } from "mongoose";
import { EntityKey } from "../enums";
import { getEntityModel } from "../helpers";
import { ResponseHandler } from "../models/response_handler";
import { DOC_CREATED, DOC_DELETED, DOC_NOT_FOUND, DOC_UPDATED, ERROR, ID_NOT_MATCH, INTERNAL_SERVER_ERROR, OK, SUCCESS } from "../constants";
import ld from 'lodash';
import { IDelivery } from "../../modules/delivery/models/delivery.model";
import { BaseEntityType } from "../models/base_entity.model";

/** 
* ==== FIND ALL: 
* Find all documents in a collection  
*/
export async function findAll(key: EntityKey) {
  try {
    const model = getEntityModel(key);
    const list: Document[] = await model.find();
    //const snapshot = list.map((doc) => new model(doc));
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
* ==== FIND BY ID: 
* Find a specific document by its ID in a collection  
*/
export async function findById(key: EntityKey, id: string) {
  let doc: Document | null;
  try {
    const model = getEntityModel(key);
    const result: Document | null = await model.findById(id);
    if (result) {
      return new ResponseHandler({
        statusCode: 200,
        code: OK,
        message: SUCCESS,
        timestamp: new Date().toISOString(),
        data: result,
      });
    } else {
      return new ResponseHandler({
        statusCode: 200,
        code: OK,
        message: DOC_NOT_FOUND,
        timestamp: new Date().toISOString(),
        data: {message: DOC_NOT_FOUND},
      });
    }
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
export async function create(key: EntityKey, dataToSave: object) {
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
* ==== UPDATE ONE BY OBJECTID: 
* Update a document in a collection using its ObjectId as identifier
*/
export async function update(data: {key: EntityKey, id: string, dataToUpdate: object}) {
  try {
    const model = getEntityModel(data.key);
    const isIdMatch: boolean = data.id === (data.dataToUpdate as any)._id as string
    if (isIdMatch) {
      const result = await model.findByIdAndUpdate(data.id, data.dataToUpdate, {new: true});
      return new ResponseHandler({
        statusCode: 201,
        code: OK,
        message: DOC_UPDATED,
        timestamp: new Date().toISOString(),
        data: result,
      });
    } else {
      return new ResponseHandler({
        statusCode: 500,
        code: ERROR,
        message: ID_NOT_MATCH,
        timestamp: new Date().toISOString(),
        data: {message: ID_NOT_MATCH}
      });
    }
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
* ==== UPDATE ONE BY PROVIDED QUERY: 
* Update a document in a collection using a provided query as identifier
*/
export async function updateByQuery(data: {key: EntityKey, query: object, dataToUpdate: object}) {
  try {
    const model = getEntityModel(data.key);
    const result = await model.findOneAndUpdate(data.query , data.dataToUpdate, {new: true});
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
export async function remove(key: EntityKey, id: string) {
  try {
    const model = getEntityModel(key);
    const result = await model.findByIdAndDelete(id);
    return new ResponseHandler({
      statusCode: 201,
      code: OK,
      message: SUCCESS,
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
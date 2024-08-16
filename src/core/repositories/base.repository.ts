/* 
==============
BASE REPOSITORY
==============
*/

import { Model } from "mongoose";
import { DeliveryModel } from "../../modules/delivery/models/delivery.model";
import { EntityKey } from "../enums";
import { getEntityModel } from "../helpers";
import { ResponseHandler } from "../models/response_handler";
import { DOC_CREATED, DOC_DELETED, DOC_NOT_FOUND, DOC_UPDATED, INTERNAL_SERVER_ERROR, OK, SUCCESS } from "../constants";
import { stringify } from 'querystring';
import * as ld from 'lodash';

const defaultResponseHandler: ResponseHandler = new ResponseHandler({
  statusCode: 200,
  code: OK,
  message: SUCCESS,
  timestamp: new Date().toISOString(),
  data: {message: SUCCESS},
})

/** 
* ==== FIND ALL: 
* Find all documents in a collection  
*/
export async function findAll(key: EntityKey) {
  try {
    const model = getEntityModel(key);
    const list: Document[] = await model.find();
    const snapshot = list.map((doc) => new model(doc));
    return new ResponseHandler({
      statusCode: 200,
      code: OK,
      message: SUCCESS,
      timestamp: new Date().toISOString(),
      data: snapshot,
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

export async function findById(key: EntityKey, id: string) {
  let doc: Document | null;
  try {
    const model = getEntityModel(key);
    const result: Document | null = await model.findById(id);
    if (result) {
      const snapshot = new model(result);
      return new ResponseHandler({
        statusCode: 200,
        code: OK,
        message: SUCCESS,
        timestamp: new Date().toISOString(),
        data: snapshot,
      });
    } else {
      return new ResponseHandler({
        statusCode: 200,
        code: OK,
        message: DOC_NOT_FOUND,
        timestamp: new Date().toISOString(),
        data: {},
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

export async function create(key: EntityKey, dataToSave: object) {
  try {
    const model: Model<any>  = getEntityModel(key);
    const modelToSave: Model<any> = new model(dataToSave);
    const result = await modelToSave.create();
    return new ResponseHandler({
      statusCode: 201,
      code: OK,
      message: SUCCESS,
      timestamp: new Date().toISOString(),
      data: {message: DOC_CREATED},
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

export async function update(key: EntityKey, id: string, data: object) {
  try {
    const model = getEntityModel(key);
    const result = await model.findByIdAndUpdate(id, data);
    return new ResponseHandler({
      statusCode: 201,
      code: OK,
      message: SUCCESS,
      timestamp: new Date().toISOString(),
      data: {message: DOC_UPDATED},
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
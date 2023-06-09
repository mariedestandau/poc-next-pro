/* tslint:disable */
/* eslint-disable */
/**
 * pass Culture backoffice API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime'
import {
  OffererToBeValidated,
  OffererToBeValidatedFromJSON,
  OffererToBeValidatedFromJSONTyped,
  OffererToBeValidatedToJSON,
} from './'

/**
 *
 * @export
 * @interface ListOffererToBeValidatedResponseModel
 */
export interface ListOffererToBeValidatedResponseModel {
  /**
   *
   * @type {Array<OffererToBeValidated>}
   * @memberof ListOffererToBeValidatedResponseModel
   */
  data: Array<OffererToBeValidated>
  /**
   *
   * @type {number}
   * @memberof ListOffererToBeValidatedResponseModel
   */
  page: number
  /**
   *
   * @type {number}
   * @memberof ListOffererToBeValidatedResponseModel
   */
  pages: number
  /**
   *
   * @type {number}
   * @memberof ListOffererToBeValidatedResponseModel
   */
  size: number
  /**
   *
   * @type {string}
   * @memberof ListOffererToBeValidatedResponseModel
   */
  sort?: string | null
  /**
   *
   * @type {number}
   * @memberof ListOffererToBeValidatedResponseModel
   */
  total: number
}

export function ListOffererToBeValidatedResponseModelFromJSON(
  json: any
): ListOffererToBeValidatedResponseModel {
  return ListOffererToBeValidatedResponseModelFromJSONTyped(json, false)
}

export function ListOffererToBeValidatedResponseModelFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ListOffererToBeValidatedResponseModel {
  if (json === undefined || json === null) {
    return json
  }
  return {
    data: (json['data'] as Array<any>).map(OffererToBeValidatedFromJSON),
    page: json['page'],
    pages: json['pages'],
    size: json['size'],
    sort: !exists(json, 'sort') ? undefined : json['sort'],
    total: json['total'],
  }
}

export function ListOffererToBeValidatedResponseModelToJSON(
  value?: ListOffererToBeValidatedResponseModel | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    data: (value.data as Array<any>).map(OffererToBeValidatedToJSON),
    page: value.page,
    pages: value.pages,
    size: value.size,
    sort: value.sort,
    total: value.total,
  }
}

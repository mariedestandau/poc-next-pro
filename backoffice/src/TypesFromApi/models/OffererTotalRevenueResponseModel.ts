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
/**
 *
 * @export
 * @interface OffererTotalRevenueResponseModel
 */
export interface OffererTotalRevenueResponseModel {
  /**
   *
   * @type {number}
   * @memberof OffererTotalRevenueResponseModel
   */
  data: number
}

export function OffererTotalRevenueResponseModelFromJSON(
  json: any
): OffererTotalRevenueResponseModel {
  return OffererTotalRevenueResponseModelFromJSONTyped(json, false)
}

export function OffererTotalRevenueResponseModelFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OffererTotalRevenueResponseModel {
  if (json === undefined || json === null) {
    return json
  }
  return {
    data: json['data'],
  }
}

export function OffererTotalRevenueResponseModelToJSON(
  value?: OffererTotalRevenueResponseModel | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    data: value.data,
  }
}

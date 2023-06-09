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
 * @interface OfferersStatsResponseModel
 */
export interface OfferersStatsResponseModel {
  /**
   *
   * @type {{ [key: string]: number; }}
   * @memberof OfferersStatsResponseModel
   */
  data: { [key: string]: number }
}

export function OfferersStatsResponseModelFromJSON(
  json: any
): OfferersStatsResponseModel {
  return OfferersStatsResponseModelFromJSONTyped(json, false)
}

export function OfferersStatsResponseModelFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OfferersStatsResponseModel {
  if (json === undefined || json === null) {
    return json
  }
  return {
    data: json['data'],
  }
}

export function OfferersStatsResponseModelToJSON(
  value?: OfferersStatsResponseModel | null
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

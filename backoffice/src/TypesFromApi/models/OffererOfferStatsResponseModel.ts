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
  OffersStats,
  OffersStatsFromJSON,
  OffersStatsFromJSONTyped,
  OffersStatsToJSON,
} from './'

/**
 *
 * @export
 * @interface OffererOfferStatsResponseModel
 */
export interface OffererOfferStatsResponseModel {
  /**
   *
   * @type {OffersStats}
   * @memberof OffererOfferStatsResponseModel
   */
  data: OffersStats
}

export function OffererOfferStatsResponseModelFromJSON(
  json: any
): OffererOfferStatsResponseModel {
  return OffererOfferStatsResponseModelFromJSONTyped(json, false)
}

export function OffererOfferStatsResponseModelFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OffererOfferStatsResponseModel {
  if (json === undefined || json === null) {
    return json
  }
  return {
    data: OffersStatsFromJSON(json['data']),
  }
}

export function OffererOfferStatsResponseModelToJSON(
  value?: OffererOfferStatsResponseModel | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    data: OffersStatsToJSON(value.data),
  }
}

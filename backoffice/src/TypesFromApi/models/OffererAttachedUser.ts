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
  ValidationStatus,
  ValidationStatusFromJSON,
  ValidationStatusFromJSONTyped,
  ValidationStatusToJSON,
} from './'

/**
 *
 * @export
 * @interface OffererAttachedUser
 */
export interface OffererAttachedUser {
  /**
   *
   * @type {string}
   * @memberof OffererAttachedUser
   */
  email: string
  /**
   *
   * @type {string}
   * @memberof OffererAttachedUser
   */
  firstName?: string | null
  /**
   *
   * @type {number}
   * @memberof OffererAttachedUser
   */
  id: number
  /**
   *
   * @type {string}
   * @memberof OffererAttachedUser
   */
  lastName?: string | null
  /**
   *
   * @type {string}
   * @memberof OffererAttachedUser
   */
  phoneNumber?: string | null
  /**
   *
   * @type {number}
   * @memberof OffererAttachedUser
   */
  userOffererId: number
  /**
   *
   * @type {ValidationStatus}
   * @memberof OffererAttachedUser
   */
  validationStatus: ValidationStatus
}

export function OffererAttachedUserFromJSON(json: any): OffererAttachedUser {
  return OffererAttachedUserFromJSONTyped(json, false)
}

export function OffererAttachedUserFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): OffererAttachedUser {
  if (json === undefined || json === null) {
    return json
  }
  return {
    email: json['email'],
    firstName: !exists(json, 'firstName') ? undefined : json['firstName'],
    id: json['id'],
    lastName: !exists(json, 'lastName') ? undefined : json['lastName'],
    phoneNumber: !exists(json, 'phoneNumber') ? undefined : json['phoneNumber'],
    userOffererId: json['user_offerer_id'],
    validationStatus: ValidationStatusFromJSON(json['validationStatus']),
  }
}

export function OffererAttachedUserToJSON(
  value?: OffererAttachedUser | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    email: value.email,
    firstName: value.firstName,
    id: value.id,
    lastName: value.lastName,
    phoneNumber: value.phoneNumber,
    user_offerer_id: value.userOffererId,
    validationStatus: ValidationStatusToJSON(value.validationStatus),
  }
}

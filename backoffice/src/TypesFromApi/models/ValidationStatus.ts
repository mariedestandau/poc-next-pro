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

/**
 * An enumeration.
 * @export
 * @enum {string}
 */
export enum ValidationStatus {
  NEW = 'NEW',
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  REJECTED = 'REJECTED',
}

export function ValidationStatusFromJSON(json: any): ValidationStatus {
  return ValidationStatusFromJSONTyped(json, false)
}

export function ValidationStatusFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ValidationStatus {
  return json as ValidationStatus
}

export function ValidationStatusToJSON(value?: ValidationStatus | null): any {
  return value as any
}

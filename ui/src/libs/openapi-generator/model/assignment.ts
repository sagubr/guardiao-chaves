/**
 * key-keeper
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Permissions } from './permissions';


export interface Assignment { 
    id?: string | null;
    version?: number;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
    name: string;
    permissions?: Array<Permissions>;
    history?: Array<object>;
}


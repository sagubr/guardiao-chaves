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
import { KeyType } from './keyType';
import { Location } from './location';


export interface Key { 
    id?: string | null;
    version?: number;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
    code: number;
    description: string;
    location: Location;
    keyType: KeyType;
    history?: Array<object>;
}
export namespace Key {
}



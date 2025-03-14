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
import { Requester } from './requester';
import { Facility } from './facility';
import { LocationType } from './locationType';


export interface Location { 
    id?: string | null;
    version?: number;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
    name: string;
    description?: string;
    facility: Facility;
    locationType: LocationType;
    maxCapacity?: number;
    publicAccess?: boolean;
    restricted?: boolean;
    openingTime?: string;
    closingTime?: string;
    responsibles?: Array<Requester>;
    history?: Array<object>;
}


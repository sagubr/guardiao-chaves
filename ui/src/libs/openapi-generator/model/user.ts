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
import { Assignment } from './assignment';


export interface User { 
    id?: string | null;
    version?: number;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
    name: string;
    username: string;
    email: string;
    password: string;
    firstAccess: boolean;
    assignment?: Assignment | null;
}


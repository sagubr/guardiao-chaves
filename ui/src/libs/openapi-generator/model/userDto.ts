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


export interface UserDto { 
    email?: string;
    name?: string;
    password: string;
    username: string;
    assignment: Assignment;
}


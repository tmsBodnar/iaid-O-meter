import { Kata } from "./Kata";
import { Technic } from "./Technic";

export interface Jakukante {
    uid?:string;
    name: string;
    description: String;
    technics: Technic[];
}
import { Kata } from "./Kata";
import { Technic } from "./Technic";

export interface Jakukante {
    details: String;
    katas: Kata[];
    technics: Technic[];
}
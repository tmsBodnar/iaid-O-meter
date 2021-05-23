import { Kata } from "./Kata";
import { Technic } from "./Technic";

export interface Jakukante {
    description: String;
    needsPractice: boolean;
    technics: Technic[];
}
import { Kata } from "./Kata";
import { Kihon } from "./Kihon";

export interface Jakukante {
    uid?:string;
    short: string;
    description: String;
    technics: Kihon[];
}
import { Iaidoka } from "./Iaidoka";
import { Kata } from "./Kata";

export interface Training {
    iaidoka: Iaidoka;
    date: Date;
    katas: Kata[];
}
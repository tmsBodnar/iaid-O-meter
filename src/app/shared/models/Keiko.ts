import { Iaidoka } from "./Iaidoka";
import { Kata } from "./Kata";

export interface Keiko {
    uid: string;
    iaidoka: Iaidoka;
    date: Date;
    katas: Kata[];
}
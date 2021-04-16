import { Dojo } from "./Dojo";
import { Sensei } from "./Sensei";

export interface Iaidoka {
    uid: number;
    name: String;
    dojo: Dojo;
    sensei: Sensei;
    email: String;
}
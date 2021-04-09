import { Dojo } from "./Dojo";
import { Grade } from "./Grade";
import { Sensei } from "./Sensei";

export interface Iaidoka {
    id: number;
    name: String;
    grade: Grade;
    sensei: Sensei;
    dojo: Dojo;
}
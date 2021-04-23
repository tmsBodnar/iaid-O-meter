import { Dojo } from "./Dojo";
import { Ryuha } from "./Ryuha";
import { Sensei } from "./Sensei";

export interface Iaidoka {
    uid: number;
    name: String;
    email: String;
    ryuha: Ryuha;
}
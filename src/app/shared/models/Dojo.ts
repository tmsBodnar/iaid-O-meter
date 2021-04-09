import { Ryuha } from "./Ryuha";
import { Sensei } from "./Sensei";

export interface Dojo {
    name: String;
    location: String;
    senseis: Sensei[];
    ryuhas: Ryuha[];
}
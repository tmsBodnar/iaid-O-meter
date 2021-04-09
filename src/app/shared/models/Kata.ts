import { Jakukante } from "./Jakukante";
import { KataType } from "./KataType";
import { Media } from "./Media";
import { Technic } from "./Technic";

export interface Kata {
    name: String;
    type: KataType;
    number: number;
    details: String;
    medias: Media[];
    jakukantes: Jakukante[];
    technics: Technic[];
}
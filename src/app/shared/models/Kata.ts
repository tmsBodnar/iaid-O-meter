import { Jakukante } from "./Jakukante";
import { Media } from "./Media";
import { Technic } from "./Technic";

export interface Kata {
    name: String;
    number: number;
    details: String;
    medias: Media[];
    jakukantes: Jakukante[];
    technics: Technic[];
}
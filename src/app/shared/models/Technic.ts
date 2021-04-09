import { Jakukante } from "./Jakukante";
import { Media } from "./Media";

export interface Technic {
    jakukantes: Jakukante[];
    details: String;
    medias: Media[];
    priority: number;
}
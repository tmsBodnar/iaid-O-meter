import { Jakukante } from "./Jakukante";
import { Media } from "./Media";
import { Kihon } from "./Kihon";

export interface Kata {
    uid?: string;
    name: String;
    number: number;
    description: String;
    medias: Media[];
    jakukantes: Jakukante[];
    ryuha: String;
    kihons: Kihon[];
}
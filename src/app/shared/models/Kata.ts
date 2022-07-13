import { Note } from './Note';
import { Media } from './Media';
import { Ryuha } from './Ryuha';

export interface Kata {
  uid?: string;
  name: String;
  number: number;
  description: String;
  medias: Media[];
  notes: Note[];
  ryuha: Ryuha;
}

import { Kata } from './Kata';

export interface Ryuha {
  uid?: string;
  name: string;
  katas: Kata[];
}

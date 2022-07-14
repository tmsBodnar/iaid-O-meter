import { Ryuha } from './Ryuha';

export interface Iaidoka {
  uid: string;
  name: String;
  email: String;
  ryuhas: Ryuha[];
}

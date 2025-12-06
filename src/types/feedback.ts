import { BaseEntity } from ".";
import { User } from "./users";

export interface Feedback extends BaseEntity {
  id: number;
  comment?: string;
  rating?: number;
  userId?: number;
  user?: User;
}

import { CategoryEnum } from '../enums';

export interface TaskModel {
  id: number;
  label: string;
  description: string;
  category: CategoryEnum;
  done: boolean | string;
}

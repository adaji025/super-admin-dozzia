import { ClassroomType } from "./classTypes";

export type ClassWallState = {
  activeClassName: string;
  activeClassId: string;
  classes: ClassroomType[];
  classTeacherId: string;
};

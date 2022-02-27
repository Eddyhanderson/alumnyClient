import { List } from "lodash";
import { LessonModel } from "../lesson-model/lesson.model";

export class ModuleModel {
    id?: string;
    name: string;
    description: string;
    picture: string;
    formationId: string;
    sequence?: number;
    lessons?: List<LessonModel>;
}

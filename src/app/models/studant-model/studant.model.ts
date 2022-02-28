import { CourseModel } from "../course-model/course.model";
import { UserModel } from "../user-model/user-model";

export class StudantModel {

    id?: string;

    userId?: string;

    organId: string;

    organName?: string;

    picture?: string;

    responsable?: boolean;

    firstName: string;

    lastName: string;

    studantCode?: string;
}
import { CourseModel } from "../course-model/course.model";
import { UserModel } from "../user-model/user-model";

export class StudantModel {

    id?: string;

    firstName?: string;

    lastName?: string;

    userId?: string;

    pictureProfilePath?: string;

    academicLevelId?: string;

    academicLevelName?: string;

    academyId?: string;

    academyName?: string;

    courseId?: string;

    courseName?: string;

    studantCode?: string;
}
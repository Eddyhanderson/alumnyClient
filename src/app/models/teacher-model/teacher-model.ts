import { AcademyModel } from '../academy-model/academy.model';
import { CourseModel } from '../course-model/course.model';
import { UserModel } from '../user-model/user-model';
import { AcademicLevelModel } from '../academic-level-model/academic-level.model';

export declare class TeacherModel {

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

        teacherPlaceQnt?: string;

        teacherCode?: string;
}

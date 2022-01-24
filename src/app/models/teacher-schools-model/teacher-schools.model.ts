import { SchoolModel } from '../school-model/school.model';
import { TeacherModel } from '../teacher-model/teacher-model';

export declare class TeacherSchoolsModel {
    teacher?: TeacherModel;

    teacherId:string;

    school?: SchoolModel;

    schoolId:string;

    situation?: string;

    dateSituation?: Date;

    creationAt?: Date;
}
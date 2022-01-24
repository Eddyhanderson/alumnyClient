import { CourseModel } from "src/app/models/course-model/course.model"
import { SchoolModel } from "src/app/models/school-model/school.model"
import { TeacherPlaceModel } from "src/app/models/teacher-place-model/teacher-place.model"

export type TeacherPlaceGroup = {
    school: SchoolModel,
    courseTeacherPlaces?: [{
        course: CourseModel,
        teacherPlaces: TeacherPlaceModel[]
    }],
}
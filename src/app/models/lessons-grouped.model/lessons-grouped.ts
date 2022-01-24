import { DisciplineTopicModel } from "../discipline-topic-model/discipline-topic.model"
import { LessonModel } from "../lesson-model/lesson.model"

export class LessonGroupedModel {
    disciplineTopic: DisciplineTopicModel;
    lessons: LessonModel[];
}
import { FormationEventModel } from "../formation-event-model/formation-event.model";

export class FormationModel {
    id?: string;
    theme: string;
    category: string;
    description: string;
    price: number;
    schoolId: string;
    situation?: string;
    dateSituation?: Date;
    dateCreation?: Date;
    published?: boolean;
    picture?: string;
    schoolPicture?: string;
    schoolAcronym?: string;
    schoolName?: string;
    end?: Date;
    start?: Date;
    modulesCount?: number;
    lessonCount?: number;
    subscriptionCount?: number;
    studantLimit?:number;
    state?: string;
}

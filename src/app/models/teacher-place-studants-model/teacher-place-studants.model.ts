import { TeacherPlaceRegistrationState } from "src/app/shared/utils/constants";
import { StudantModel } from "../studant-model/studant.model";
import { TeacherPlaceModel } from "../teacher-place-model/teacher-place.model";

export class TeacherPlaceStudantsModel{
    
        public teacherPlace?:TeacherPlaceModel;

        public teacherPlaceId:string;

        public studant?:StudantModel;

        public studantId:string;

        public registeredAt?:Date;

        public months:number;

        public situation:TeacherPlaceRegistrationState;
        
        public dateSituation?:Date;
}
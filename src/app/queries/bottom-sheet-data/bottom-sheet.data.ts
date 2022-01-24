import { DocumentLeave } from "src/app/shared/utils/constants";

export interface BottomSheetData{
    datas:{
        title:string,
        description?:string,
        action:any
    }[]
}
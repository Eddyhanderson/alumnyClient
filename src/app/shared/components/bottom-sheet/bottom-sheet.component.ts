import { Component, Inject } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
import { BottomSheetData } from "src/app/queries/bottom-sheet-data/bottom-sheet.data";
import { DocumentLeave } from "../../utils/constants";


@Component({
    selector: 'app-snack-bar',
    templateUrl: 'bottom-sheet.component.html',
    styleUrls: ['bottom-sheet.component.scss']
})
export class BottomSheetComponent {
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomSheetData,
        private ref: MatBottomSheetRef<BottomSheetComponent>) { }

    public dismiss(action:any){
        this.ref.dismiss(action);                                           
    }

}
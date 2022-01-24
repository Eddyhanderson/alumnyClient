import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild } from "@angular/core";
import Quill from 'quill';
import Delta from '../../../../../node_modules/@types/quill/node_modules/quill-delta/dist/Delta';

@Component({
    selector: 'text-visualizer',
    styles: ['text-visualizer.component.scss'],
    templateUrl: 'text-visualizer.component.html'

})
export class TextVisualizerComponent implements AfterViewInit {
    @Input('content')
    content: string;

    @ViewChild('visualizer')
    visualizer: ElementRef<HTMLElement>;

    _quill: Quill;

    ngAfterViewInit(): void {
        this._quill = new Quill(this.visualizer.nativeElement,
            {
                readOnly: true,
                theme: 'bubble'
            })        

        if (this.content != null){
            let data: Delta = JSON.parse(this.content);     
            this._quill.setContents(data);
        }

    }

}
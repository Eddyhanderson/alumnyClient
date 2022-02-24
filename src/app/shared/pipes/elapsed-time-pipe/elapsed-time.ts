import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'elapsed' })
export class ElapsedTimePipe implements PipeTransform {
    private timeEstimated: string;
    private _date: Date;
    private date:string;


    transform(value: string, ...args: any[]):string {
        this.setDateInternal(value);
        let duration = this.calculateDuration();
        this.setTimeEstimated(duration);
        return this.writeTimeEstimated();        
    }

    private setDateInternal(date:string) {
        this.date = date;

        let dateDivisor = this.date.split(new RegExp('-|T|Z|:'));

        let year = Number.parseInt(dateDivisor[0]);
        let month = Number.parseInt(dateDivisor[1]) - 1;
        let day = Number.parseInt(dateDivisor[2]);

        let hour = Number.parseInt(dateDivisor[3]);
        let min = Number.parseInt(dateDivisor[4]);
        let sec = Number.parseInt(dateDivisor[5]);

        this._date = new Date(year, month, day, hour, min, sec);
    }

    private setTimeEstimated(duration: number) {
        if (duration < 60) {
            this.timeEstimated = `há ${duration} seg`;
        } else if (duration >= 60 && duration < 3600) {
            duration = Math.floor(duration / 60);
            this.timeEstimated = `há ${duration} min`;
        } else if (duration >= 3600 && duration < 86400) {
            duration = Math.floor(duration / 3600);
            this.timeEstimated = duration > 1 ? `há ${duration} horas` : `há ${duration} hora`;
        } else if (duration >= 86400 && duration < 2678400) {
            duration = Math.floor(duration / 86400);
            this.timeEstimated = duration > 1 ? `há ${duration} dias` : `há ${duration} dia`;
        }else if (duration >= 2678400 && duration < 977616000) {
            duration = Math.floor(duration / 2678400);
            this.timeEstimated = duration > 1 ? `há ${duration} meses` : `há ${duration} meses`;
        }
         else if (duration >= 977616000) {
            duration = Math.floor(duration / 977616000);
            this.timeEstimated = duration > 1 ? `há ${duration} anos` : `há ${duration} ano`;
        }
    }

    private calculateDuration(): number {
        let now = new Date();

        return Math.floor((now.valueOf() - this._date.valueOf()) / 1000);
    }

    private writeTimeEstimated() {
        return this.timeEstimated;
    }    
}
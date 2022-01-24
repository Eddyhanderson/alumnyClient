import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack'
import { VideoModel } from '../../models/video-model/video.model';
import { Routes } from '../../shared/utils/routing-constants';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Console } from 'console';

@Injectable({
    providedIn: "root"
})
export class VideoUploadSignalR {
    public serverUploadState: number;
    private hubConnection: HubConnection;
    private connectionUrl = "https://localhost:5001/video/upload/watch";
    
    // video metadata
    public conversionProgress = new Subject<number>();
    public thumbnail = new Subject<string>();
    public manifest = new Subject<string>();



    public constructor(private http: HttpClient) {

    }

    public async onInit() {
        await this.startConnection();
        this.addListeners();
    }

    public async videoUploadWatch(video: VideoModel) {
        this.invokeGetConnectionId().then(async (connectionId) => {
            var url = Routes.VIDEO_UPLOAD_WATCH.replace("{connectionId}", connectionId);
            await this.http.post(url, video).toPromise();
        })
    }

    private getConnection(): HubConnection {
        return new HubConnectionBuilder()
            .withUrl(this.connectionUrl)
            .withHubProtocol(new MessagePackHubProtocol())
            .build();
    }

    private async startConnection() {
        this.hubConnection = this.getConnection();

        await this.hubConnection.start()
            .then(async () => {
                console.log("connection started");
            })
            .catch((error) => console.log(`error while establishing signalr connection ${error}`));
    }

    private async invokeGetConnectionId() {
        return this.hubConnection.invoke<string>("getConnectionId");
    }

    private addListeners() {
        this.hubConnection.on("receiveThumbnail", (thumbnailUrl) => {
            this.thumbnail.next(thumbnailUrl);
        });

        this.hubConnection.on("receiveManifest", (manifestUrl) => {
            this.manifest.next(manifestUrl);    
        });

        this.hubConnection.on("conversionProgress", (progress) => {
            if (progress > 0 && progress <= 100) {                
                var value = Math.round(progress / 2);
                console.log(value);
                this.conversionProgress.next(value);
            }
        });
    }
}

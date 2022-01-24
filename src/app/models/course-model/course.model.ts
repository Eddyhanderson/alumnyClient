export class CourseModel {
    constructor(id?: string, badgeInformationId?: string, profilePhotoPath?: string, name?: string) {
        this.id = id;
        this.badgeInformationId = badgeInformationId;
        this.profilePhotoPath = profilePhotoPath;
        this.name = name;
    }

    id?: string;

    badgeInformationId?: string;

    profilePhotoPath?: String;

    name: string;
}
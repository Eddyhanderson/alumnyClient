export class DisciplineModel {
    public constructor(name:string)
    {
        this.name = name;
    }
    id?: string;

    name: string;

    badgeInformationId?: string;

    profilePhotoPath?:string;
}
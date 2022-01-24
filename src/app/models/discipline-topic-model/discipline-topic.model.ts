export class DisciplineTopicModel {

    public constructor(id: string, badge: string, name: string) {
        this.id = id;
        this.badgeInformationId = badge;
        this.name = name;
    }

    id?: string;

    badgeInformationId?: string;

    name: string;
}
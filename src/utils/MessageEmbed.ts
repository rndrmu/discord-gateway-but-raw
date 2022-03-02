

export class MessageEmbed {

    title: string;
    description: string;
    color: number;
    constructor(title: string, description: string, color: number) {
        this.title = title;
        this.description = description;
        this.color = color;
    }

    toJSON() {
        return {
            "embeds": [{
                "title": this.title,
                "description": this.description,
            }]
        }
    }
}
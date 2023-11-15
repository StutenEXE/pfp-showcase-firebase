import { firebaseConfig } from "../../../env/firebase.config";

export class Pfp {
    name!: string;
    uploadDate!: Date;
    // In bytes
    size!: number;
    order!: number;

    constructor(name: string, uploadDate: Date, size: number, order: number) {
        this.name = name;
        this.size = size;
        this.uploadDate = uploadDate;
        this.order = order;
    }

    getUrl(): string {
        if (!this.name) {
            return "error";
        }
        return firebaseConfig.imageTemplateUrl(this.name);
    }
}
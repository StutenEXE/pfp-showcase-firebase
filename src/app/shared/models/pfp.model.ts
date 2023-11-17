import { firebaseConfig } from "../../../env/firebase.config";

export class Pfp {
    name!: string;
    url!: string;
    uploadDate!: Date;
    // In bytes
    size!: number;
    order!: number;

    // getUrl(): string {
    //     if (!this.name) {
    //         return "error";
    //     }
    //     return firebaseConfig.imageTemplateUrl(this.name);
    // }
}
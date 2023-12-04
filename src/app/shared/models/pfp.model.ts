import { firebaseConfig } from "../../../env/firebase.config";

export class Pfp {
    name!: string;
    url!: string;
    uploadDate!: Date;
    // In bytes
    size!: number;
    order!: number;

    static compareFn(pfp1: Pfp, pfp2: Pfp): number {
        return pfp1 < pfp2 ? -1 : 
        pfp1 > pfp2 ? 1 : 0;
    }
}
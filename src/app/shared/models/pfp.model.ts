import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class Pfp {
    name!: string;
    filename!: string;
    url!: string;
    uploadDate!: Date;
    // In bytes
    size!: number;
    order!: number;
    tags!: string[];
    alternates!: string[];

    constructor(name: string = "", filename: string = "", url: string = "", uploadDate: Date = new Date(), size: number = 0, order: number = 0, tags: string[] = [], alternates: string[] = []) {
        this.name = name;
        this.filename = filename;
        this.url = url;
        this.uploadDate = uploadDate;
        this.size = size;
        this.order = order;
        this.tags = tags;
        this.alternates = alternates;
    }   

    static compareFn(pfp1: Pfp, pfp2: Pfp): number {
        return pfp1 < pfp2 ? -1 : 
        pfp1 > pfp2 ? 1 : 0;
    }
}

export const pfpConverter = {
    toFirestore: (pfp: Pfp) => {
        return {
            name: pfp.name,
            filename: pfp.filename,
            url: pfp.url,
            uploadDate: pfp.uploadDate,
            size: pfp.size,
            order: pfp.order,
            tags: pfp.tags,
            alternates: pfp.alternates,
        };
    },
    fromFirestore: (snapshot: any) => {
        const data = snapshot;
        return new Pfp(data['name'], data['filename'], data['url'], data['uploadDate'], data['size'], data['order'], data['tags'], data['alternates'])
    }
};
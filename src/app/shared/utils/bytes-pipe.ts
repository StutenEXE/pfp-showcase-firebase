import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'bytesPipe'
})
export class BytesPipe implements PipeTransform {
    transform(value: number): string {
        if (value >= 1000000) return `${(value / 1000000).toFixed(2)} MB`
        else if (value >= 1000) return `${(value / 1000).toFixed(2)} KB`
        return `${value} B`;
    }

}

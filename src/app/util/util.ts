export class Util {

    parseDate(date: string): string {

        var elementosDate = date.split("-");

        var dataFinal = elementosDate[2] + "/" + elementosDate[1] + "/" + elementosDate[0];

        return dataFinal;
    }
}

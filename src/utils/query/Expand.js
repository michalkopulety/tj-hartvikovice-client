export class Expand {
    constructor(fields) {
        this.fields = fields;
    }

    toQueryString(){
        return this.fields.join(",");
    }
}
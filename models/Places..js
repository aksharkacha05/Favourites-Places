export class Place{
    constructor(title,imageUri,location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = this.address;
        this.location = location
        this.id = new Date().toString()+ Math.random().toString();
    }
}
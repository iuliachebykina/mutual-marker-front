export class ActionButton {
    public cssClass: string;
    constructor(public title: string) {

    }
    public onClick: () => void = () => undefined;
}

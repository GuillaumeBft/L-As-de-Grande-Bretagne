class Player {
    cards = [];
    selectedCard = null;
    stopAtLine = 3;
    sips = 0;
    constructor(name, number) {
        this.name = name;
        this.number = number;
        $("#p"+number+"_name").text(name);
    }
}
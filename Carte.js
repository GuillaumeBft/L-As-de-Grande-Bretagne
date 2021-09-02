class Carte {
    path = "";
    position = -1;
    constructor(name) {
        this.name = name;
        this.path = "Cartes/" + name + ".jpg";
        //testCardFileExists(this.path);
        this.prettyName = name.replace(/_/g, " ");
        this.value = name.split("_")[0];
        this.sign = name.split("_")[2];
        this.color = (this.sign == "pique" || this.sign == "trefle") ? "Noir" : "Rouge";
    }
}

function testCardFileExists(path) {
    var file = new File(path);
    if (!file.exists()) {
        console.log("ERROR : file " + path + " doesn't exist");
    }
}
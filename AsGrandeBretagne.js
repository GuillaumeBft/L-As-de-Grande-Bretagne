$(document).ready(function () {
    onBoardCards = [];
    allCards = [new Carte("As_de_coeur"), new Carte("Deux_de_pique"), new Carte("Trois_de_pique"), new Carte("Quatre_de_pique"), 
                new Carte("Cinq_de_pique"), new Carte("Six_de_pique"), new Carte("Sept_de_pique"), new Carte("Huit_de_pique"), 
                new Carte("Neuf_de_pique"), new Carte("Dix_de_pique"), new Carte("Vallet_de_pique"), new Carte("Dame_de_pique"), 
                new Carte("Roi_de_pique"), 
                new Carte("As_de_trefle"), new Carte("Deux_de_trefle"), new Carte("Trois_de_trefle"), new Carte("Quatre_de_trefle"), 
                new Carte("Cinq_de_trefle"), new Carte("Six_de_trefle"), new Carte("Sept_de_trefle"), new Carte("Huit_de_trefle"), 
                new Carte("Neuf_de_trefle"), new Carte("Dix_de_trefle"), new Carte("Vallet_de_trefle"), new Carte("Dame_de_trefle"), 
                new Carte("Roi_de_trefle"), 
                new Carte("As_de_coeur"), new Carte("Deux_de_coeur"), new Carte("Trois_de_coeur"), new Carte("Quatre_de_coeur"), 
                new Carte("Cinq_de_coeur"), new Carte("Six_de_coeur"), new Carte("Sept_de_coeur"), new Carte("Huit_de_coeur"), 
                new Carte("Neuf_de_coeur"), new Carte("Dix_de_coeur"), new Carte("Vallet_de_coeur"), new Carte("Dame_de_coeur"), 
                new Carte("Roi_de_coeur"), 
                new Carte("As_de_carreau"), new Carte("Deux_de_carreau"), new Carte("Trois_de_carreau"), new Carte("Quatre_de_carreau"), 
                new Carte("Cinq_de_carreau"), new Carte("Six_de_carreau"), new Carte("Sept_de_carreau"), new Carte("Huit_de_carreau"), 
                new Carte("Neuf_de_carreau"), new Carte("Dix_de_carreau"), new Carte("Vallet_de_carreau"), new Carte("Dame_de_carreau"), 
                new Carte("Roi_de_carreau")];

    $("#throw").click(function () {
        cardsSelected = true;
        $(".selectpicker").toArray().forEach(selectpicker => {
            if ($(selectpicker).selectpicker("val") == "null") {
                cardsSelected = false;
            }
        });
        verifyCheckboxes();
        roundStopped = player1.stopAtLine < ligne && player2.stopAtLine < ligne;

        if (roundOver) {
            //Reset after round over
            ligne = 1;
            roundOver = false;
            onBoardCards = [];
            player1.stopAtLine = 3;
            player2.stopAtLine = 3;
            resetBoard();
            getCheckBoxesChecked()
        } else if (roundStopped || ligne > 3) {
            //Round over, players get their cards
            roundEnd();
            roundOver = true;
            disableCheckbox();
        } else if (cardsSelected) {
            //Another line revealed
            if (ligne == 1) {
                enableCheckbox();
            }
            $(".selectpicker").each(function () {
                $(this).prop('disabled', true);
                $(this).selectpicker('refresh');
            });
            $("#ligne" + ligne).children().each(function () {
                randomCard = availableCards[Math.floor(Math.random()*availableCards.length)];
                $(this).attr("src", randomCard.path);
                availableCards.splice(availableCards.indexOf(randomCard), 1);
                onBoardCards.push(randomCard);
            });
            ligne++;
        } else {
            alert("Une carte n'a pas été selectionnée");
        }
    });

    //Init
    player1 = new Player("P1", 1);
    player2 = new Player("P2", 2);
    players = [player1, player2];
    ligne = 1;
    roundOver = false;
    roundStopped = false;
    availableCards = allCards.slice();
    
    $("#p1_select").on('changed.bs.select', function () {
        player1.selectedCard = new Carte($("#p1_select").selectpicker("val"));
    });
    $("#p2_select").on('changed.bs.select', function () {
        player2.selectedCard = new Carte($("#p2_select").selectpicker("val"));
    });

    //Game iteration
    $(".selectpicker").toArray().forEach(selectpicker => {
        $(selectpicker).append('<option value="null">Pas sélectionné</option>');
        availableCards.forEach(card => {
            $(selectpicker).append('<option value=' + card.name + '>' + card.prettyName + '</option>');
        });
        $(selectpicker).selectpicker("refresh");
    });
      

    function roundEnd() {
        $(".selectpicker").each(function () {
            $(this).prop('disabled', false);
            $(this).selectpicker('refresh');
        });
        onBoardCards.forEach(card => {
            card.position = onBoardCards.indexOf(card) % 5;
        });
        onBoardCards.forEach(card => {
            players.forEach(player => {
                if (card.value == player.selectedCard.value) {
                    player.cards.push(card);
                    onBoardCards.splice(onBoardCards.indexOf(card), 1);
                    $("img[src='" + card.path + "']").first().attr("src", "Cartes/dos_de_carte.jpg");
                    $("#p"+player.number+"_cards_number").text(player.cards.length);
                    assignSips(card, player);
                    console.log(player.name + " receives " + card.name);
                }
            });
        });
        availableCards = availableCards.concat(onBoardCards);
    }

    function resetBoard() {
        $(".cartes").each(function () {
            $(this).attr("src", "Cartes/dos_de_carte.jpg");
        });
    }

    function disableCheckbox() {
        $("input[type='checkbox']").each(function () {
           $(this).attr("disabled", true); 
        });
    }

    function enableCheckbox() {
        $("input[type='checkbox']").each(function () {
           $(this).removeAttr("disabled"); 
        });
    }

    function verifyCheckboxes() {
        $("input[type='checkbox']").each(function () {
            checkboxNumber = $(this).attr("id").split("_")[0][1];
            if (!$(this).get()[0].checked && players[checkboxNumber-1].stopAtLine == 3) {
                players[checkboxNumber-1].stopAtLine = ligne - 1;
                $(this).attr("disabled", true);
            } 
        });
    }

    function getCheckBoxesChecked() {
        $("input[type='checkbox']").each(function () {
            $(this).get()[0].checked = true;
        });
    }

    function assignSips(card) {
        console.log(card.name + " : " + card.position);
    }
});
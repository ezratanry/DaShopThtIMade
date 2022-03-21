$(document).ready(function(){
    var jsonStringListOfFood = '{ "items" : [ '           +
    '{ "name": "Half A Car",     "price": "5" },'   +
    '{ "name": "Pokeball",   "price": "6" },'   +
    '{ "name": "Guitar",       "price": "3" },'   +
    '{ "name": "Baby Fox",      "price": "8" },'   +
    '{ "name": "Naruto",     "price": "7" }, '   +
    '{ "name": "MrBeast",     "price": "690000" }, '   +
    '{ "name": "dream",     "price": "100" }, '   +
    '{ "name": "Hydrogen",     "price": "51" }, '   +
    '{ "name": "Anubis",     "price": "230" }, '   +
    '{ "name": "My Life",     "price": "1" }, '   +
    '{ "name": "Imposter",     "price": "505" }, '   +
    '{ "name": "Glowing Butterfly",     "price": "3061" }, '   +
    '{ "name": "Sparkly Tree",     "price": "000084" }, '   +
    '{ "name": "Explicit Content",     "price": "34" }, '   +
    '{ "name": "Bowser",     "price": "9572" }, '   +
    '{ "name": "Cybernetic Skeletal",     "price": "250" }, '   +
    '{ "name": "Minion",     "price": "64" }, '   +
    '{ "name": "Fire In Ice",     "price": "723" } '   +
    '] }';

    console.log(jsonStringListOfFood);

    var jsonObjectListOfFood = JSON.parse(jsonStringListOfFood);
    console.log(jsonObjectListOfFood); // this is an object

    var jsonStringListOfFood = JSON.parse(jsonStringListOfFood)

    $('#food-items').append(newCard)

    var jsonObjectList = jsonStringListOfFood.items;
    for (i = 0; i < jsonObjectList.length; i++) {
        var object = jsonObjectList[i]

        // add card for object
        var itemName = object.name;
        var itemPrice = object.price;

        var newCard = getCardElement(itemName, itemPrice);
        $('#food-items').append(newCard);
    }


    /* Search Bar */
    function filterCards() {
        var searchTerm = $(this).val().toLowerCase();

        $("food-items .card").each(function() {
            var cardContent = $(this).text().toLowerCase();
            var searchMatch = cardContent.indexOf(searchTerm) > -1;
            $(this).toggle(searchMatch); // show if match, hide if not match
        })

        var cardContent = $(this).find('h2.card-text').text().toLowerCase();
    }


    var searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("keyup", function(event){
        var text = searchBar.value.toLowerCase();

        for (var i = 0; i < newCard.length; i++){
            if (newCard[i].indexOf(text) < 0) {
                newCard[i].style.display = "None";
            }
            else {
                newCard[i].style.display = "Block";
            }
        }
    });


    $("#food-items .card .fa-minus-square").click(removeCartItem);
    $("#food-items .card .fa-plus-square").click(addCartItem);

    function addCartItem() {
        var quantityHolder = $(this).parent('.cart-buttons').find('.qty-value').first();

        var currentQty = parseInt(quantityHolder.text())
        var newQty = currentQty + 1;
        quantityHolder.html(newQty);
    }

    function removeCartItem() {
        var quantityHolder = $(this).parent('.cart-buttons').find('.qty-value').first();

        var currentQty = parseInt(quantityHolder.text());
        console.log(currentQty);
        var newQty = Math.max(currentQty - 1, 0)
        quantityHolder.html(newQty);
    }

    $('.checkout #checkout-btn').click(checkoutCart);

    $("search-bar").on("keyup", filterCards);
    $("#food-items .card").hover(addHighlight, removeHighlight);
});

/* Hover */
function addHighlight() {
    $(this).removeClass("bg-light")
    $(this).addClass("text-white bg-info");
}

function removeHighlight() {
    $(this).removeClass("text-white bg-info");
    $(this).addClass("bg-light")
}

/* Checkout */
function checkoutCart() {
    var receipt = {};
    receipt["totalCost"] = 0;

    var foodItemsContainer = $(this).parents('body').find('#food-items');
    foodItemsContainer.find('.card').each(function() {

        var itemName = $(this).find('h2.card-text').text();

        var itemPriceString = $(this).find('h5').text().replace("$", "");
        var itemPriceInt = parseInt(itemPriceString);

        var itemQtyString = $(this).find('.qty-value').text();
        var itemQtyInt = parseInt(itemQtyString);

        var itemCost = itemPriceInt * itemQtyInt;
        

        if (itemCost > 0) {
            receipt[itemName] = itemQtyString;
            receipt[itemName] = itemQtyInt;
            receipt["totalCost"] += itemCost;
        }
    });

    console.log(receipt);

    var message = "Confirm and proceed to payment";
    message += "\n Total cost: $" + receipt["totalCost"];
    for (var itemName in receipt) {
        // iterate through attributes of receipt
        if (itemName == "totalCost") {
            continue;
        }

        var itemQtyString = receipt[itemName];
        message += "\n" + itemQtyString + "x " + itemName;
    }
    var response = confirm(message);

    if(response == true) {
        // direct to payment
        console.log("Proceeding to payment");
        sessionStorage.setItem("totalCost", receipt["totalCost"]);
        window.location.replace("payment.html");
    }

}

function getCardElement(itemName, itemPrice) {
    var newCard =   '<div class="card bg-light">' +
                    '<div class="card-body text-center">' +
                    '<h2 class="card-text">' +
                    itemName +
                    '</h2>' +
                    '<img src="assets/' +
                    itemName +
                    '.PNG">' +
                    '<h5> $' +
                    itemPrice +
                    '</h5>' +
                    '<div class="cart-buttons">' +
                    '<i class="fas fa-minus-square fa-2x"> </i>' +
                    '<span class="qty"> Qty: ' +
                    '<span class="qty-value"> 0 </span>' +
                    '</span>' +
                    '<i class="fas fa-plus-square fa-2x"> </i>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
    return newCard
}
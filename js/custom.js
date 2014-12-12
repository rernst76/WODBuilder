// Code to filter movement list
var $products = $('#movementList li');
$('#movementFilter').keyup(function() {
    var re = new RegExp($(this).val(), "i"); // "i" means it's case-insensitive
    $products.show().filter(function() {
        return !re.test($(this).text());
    }).hide();
});


function handleDragStart(e) {
    e.dataTransfer.effectAllowed='copy';
    this.style.opacity = '0.4';
    e.dataTransfer.setData("text/html", e.target);
}

// Add listeners for dragstart
var items = document.querySelectorAll(".xitem, .mitem");
[].forEach.call(items, function(item) {
   item.addEventListener('dragstart', handleDragStart, false); 
});

// 
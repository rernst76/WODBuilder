// Code to filter movement list
var $products = $('#movementList li');
$('#movementFilter').keyup(function() {
    var re = new RegExp($(this).val(), "i"); // "i" means it's case-insensitive
    $products.show().filter(function() {
        return !re.test($(this).text());
    }).hide();
});

// Function to handle dragstart event
function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'copy';
    this.style.opacity = '0.4';
    e.dataTransfer.setData("text/html", e.target);
}

// Function to handle dragenter
function handleDragEnter(e) {
    e.target.querySelector('.itemDragAreaText')
      .style.visibility = "hidden";
    this.classList.add("dragover");
}

// Function ot handle dragover
function handleDragOver(e) {
    e.preventDefault(); // Necessary to allow drop
    e.dataTransfer.dropEffect = 'copy';
}

// Function to handle dragleave
function handleDragLeave(e) {
    e.target.querySelector('.itemDragAreaText')
      .style.visibility = "visible";
    this.classList.remove("dragover");
}

// Add listeners to draggable items
var items = document.querySelectorAll(".xitem, .mitem");
[].forEach.call(items, function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
});

// Add listeners to drop areas
items = document.querySelectorAll(".itemDragArea");
[].forEach.call(items, function(item) {
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
});

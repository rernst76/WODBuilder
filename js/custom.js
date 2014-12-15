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
    e.dataTransfer.effectAllowed = 'copyMove';
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    this.style.opacity = '0.4';
}

// Function to handle dragenter
function handleDragEnter(e) {
    var element = e.target.querySelector('.itemDragAreaText');
    if (element.parentNode === e.target)
        element.style.visibility = "hidden";
      
    e.target.classList.add("dragover");
    
}

// Function ot handle dragover
function handleDragOver(e) {
    e.preventDefault(); // Necessary to allow drop
    e.dataTransfer.dropEffect = 'copy';
}

// Function to handle dragleave
function handleDragLeave(e) {
    var element = e.target.querySelector('.itemDragAreaText');
    if (element.parentNode === e.target)
        element.style.visibility = "visible";
        
    e.target.classList.remove("dragover");
    
}

// Function to handle drag drop event
function handleDrop(e) {
    // Remove drag over styling
    e.target.classList.remove("dragover");
    
    // Create new node to be dropped, modify styles
    var new_node = document.createElement('div');
    new_node.innerHTML = e.dataTransfer.getData('text/html');
    new_node.classList.add("panel", "panel-default", "dropped");
    
    var new_node_inner = new_node.firstChild;
    new_node_inner.classList.add("panel-body");
    new_node_inner.classList.remove("xitem");
    
    var drop_text = e.target.querySelector('.itemDragAreaText');
    // If there is drop text, replace it with the dragged node
    if (drop_text.parentNode === e.target){
        e.target.replaceChild(new_node, drop_text);
    } else { // Else make a new node and 
        e.target.appendChild(new_node);
    }
    
}

// Function to handle drag end
function handleDragEnd(e) {
    this.style.opacity = '1';
}

// Add listeners to draggable items
var items = document.querySelectorAll(".xitem, .mitem");
[].forEach.call(items, function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragend', handleDragEnd, false);
});

// Add listeners to drop areas
items = document.querySelectorAll(".entry .itemDragArea");
[].forEach.call(items, function(item) {
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
});


// Adds drop zone at first and last element position inside of node
function insertDropZones(node) {
    
}

// Removes drop zone at first and last element position inside of node
function removeDropZones(node) {
    
}

// Code to filter movement list
var $products = $('#movementList li');
$('#movementFilter').keyup(function() {
    var re = new RegExp($(this).val(), "i"); // "i" means it's case-insensitive
    $products.show().filter(function() {
        return !re.test($(this).text());
    }).hide();
});

// Global var to avoid shitty DnD browser support
var dnd = {
    action: "",
    dragElement: document.createDocumentFragment(), // Item being dragged
    data: "",
    dropElement: document.createDocumentFragment()  // Item being created using move/copy
};

// Function to handle dragstart event
function handleDragStart(e) {
    
    //Set action based on stockitem class
    dnd.action  = (e.target.classList.contains("stockitem")) ? "copy" : "move";
    
    e.originalEvent.dataTransfer.effectAllowed = 'all';
    dnd.data = e.target.outerHTML;
    
    // Set dragElement
    dnd.dragElement = e.target;
    dnd.dragElement.style.opacity = '0.4';
}

// Function to handle dragenter
function handleDragEnter(e) {
    e.preventDefault();
    
    // Add dragover class to e.target
    $(this).addClass("dragover");
    
    // Check if entered element contains drag area text, hide it
    var dragAreaText = $(this).children(".itemDragAreaText");
    if (dragAreaText) {
        dragAreaText.css("visibility", "hidden");
    }
}

// Function to handle dragover
function handleDragOver(e) {
    e.preventDefault(); // Necessary to allow drop
}

// Function to handle dragleave
function handleDragLeave(e) {
    // Remove dragover class from e.target
    $(this).removeClass("dragover");
    
    // Check if left element contains drag area text, show it
    var dragAreaText = $(this).children(".itemDragAreaText");
    if (dragAreaText) {
        dragAreaText.css("visibility", "visible");
    }
}

// Function to handle drop event
function handleDrop(e) {
    e.preventDefault();
    
    // Remove drag over styling
    e.target.classList.remove("dragover");
    
    // Create new node to be dropped, modify styles
    var new_node = document.createElement('div');
    new_node.innerHTML = dnd.data;
    new_node.classList.add("panel", "panel-default", "dropped");
    
    if (dnd.action === 'copy') {
        
        var new_node_inner = new_node.firstChild;
        new_node_inner.classList.add("panel-body");
        new_node_inner.classList.remove("xitem", "stockitem");
        new_node_inner.addEventListener('dragend', handleDragEnd, false);
        new_node_inner.addEventListener('dragstart', handleDragStart, false);
        
        var drop_text = e.target.querySelector('.itemDragAreaText');
        // If there is drop text, replace it with the dragged node
        if (drop_text.parentNode === e.target){
            e.target.replaceChild(new_node, drop_text);
        } else { // Else make a new node and 
            e.target.appendChild(new_node);
        }
        
    } else if (dnd.action === "move") {
        dnd.dragElement.parentNode.parentNode.removeChild(dnd.dragElement.parentNode);
        console.log(dnd.dragElement.parentNode.parentNode);
        dnd.dropElement = new_node
        e.target.appendChild(dnd.dropElement);
    }
    
}

// Function to handle drag end
function handleDragEnd(e) {
    console.log("Drag End:");
    console.log(dnd.dropElement);
    dnd.dragElement.style.opacity = '1';
    if(dnd.action === "move")
        dnd.dropElement.childNode.style.opacity = '1';
}

// Add listeners to draggable items
$(".xitem, .mitem").on({
    'dragstart': handleDragStart,
    'dragend': handleDragEnd
});

// Add listeners to drop areas
$(".entry .itemDragArea").on({
    'dragenter': handleDragEnter,
    'dragover': handleDragOver,
    'dragleave': handleDragLeave,
    'drop': handleDrop
});

// Adds drop zone at first and last element position inside of node
function insertDropZones(node) {
    
}

// Removes drop zone at first and last element position inside of node
function removeDropZones(node) {
    
}

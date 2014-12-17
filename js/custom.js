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
    
    // Don't let this bubble, or we will have problems with nesting
    e.stopPropagation();
    
    // Remove drag over styling
    $(this).removeClass("dragover");
    
    // Create new node to be dropped, modify styles
    var new_node = document.createElement('div');
    new_node.innerHTML = dnd.data;
    $(new_node).addClass("panel panel-default dropped");
    
    if (dnd.action === 'copy') {
        // Modify classes for inner node, add listeners for dragstart and dragend
        var new_node_inner = new_node.firstChild;
        $(new_node_inner).addClass("panel-body")
          .removeClass("xitem stockitem")
          .on({
              'dragstart': handleDragStart,
              'dragend': handleDragEnd
        });
          
        // Add listeners for drop areas
        $(new_node_inner).children(".itemDragArea").on({
            'dragenter': handleDragEnter,
            'dragover': handleDragOver,
            'dragleave': handleDragLeave,
            'drop': handleDrop
        });
        
        // Check if left element contains drag area text, replace it if so
        var dropText = $(this).children(".itemDragAreaText");
        if (dropText.length) { // Check jquery object length
            e.target.replaceChild(new_node, dropText[0]);
        } else {
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

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
    logEvent(e);
    
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
    if($(this).hasClass("itemDragArea")) {
        e.preventDefault();
        e.stopPropagation();
        logEvent(e);
        
        // Add dragover class to e.target
        $(this).addClass("dragover");
        
        // Check if entered element contains drag area text, hide it
        var dragAreaText = $(this).children(".itemDragAreaText");
        if (dragAreaText) {
            dragAreaText.css("visibility", "hidden");
        }
    }
}

// Function to handle dragover
function handleDragOver(e) {
    if($(e.target).hasClass("itemDragArea"))
        e.preventDefault();
    e.stopPropagation();
}

// Function to handle dragleave
function handleDragLeave(e) {
    if($(this).hasClass("itemDragArea")) {
        //logEvent(e);
        
        // Remove dragover class
        $(this).removeClass("dragover");
        
        // Check if element contains drag area text, show it
        var dragAreaText = $(this).children(".itemDragAreaText");
        if (dragAreaText) {
            dragAreaText.css("visibility", "visible");
        }
    }
}

// Function to handle drop event
function handleDrop(e) {
    logEvent(e);
    e.preventDefault();
    
    // Don't let this bubble, or we will have problems with nesting
    e.stopPropagation();
    
    // Remove drag over styling
    $(this).removeClass("dragover");
    
    // Make sure drop target is not a child of drag element, return if it is
    if($.contains(dnd.dragElement, e.target)) {
        $(this).trigger("dragleave"); // Manually trigger dragleave to fix text
        return false;
    }
    
    // Create new node to be dropped, modify styles
    var new_node = document.createElement('div');
    new_node.innerHTML = dnd.data;
    $(new_node).addClass("panel panel-default dropped");
    
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
    
    if (dnd.action === "move") {
        // Pre-emptively replace drag-text if needed, make sure it needs it
        var isPermArea = $(dnd.dragElement).parent().parent().hasClass('permArea');
        var numChildren = $(dnd.dragElement).parent().parent().children().length;
        if(numChildren <= 1 && !isPermArea) {
            $(dnd.dragElement).parent().parent().append('<p class="itemDragAreaText">Drop items here</p>');
        }
        
        // Remove dragged element
        $(dnd.dragElement).parent().remove();
        
    }
    
    // Check if element contains drag area text, replace it if so
    var dropText = $(this).children(".itemDragAreaText");
    if (dropText.length) { // Check jquery object length
        e.target.replaceChild(new_node, dropText[0]);
    } else {
        e.target.appendChild(new_node);
    }
    
    // Set drop element and remove opacity
    dnd.dropElement = new_node;
    $(dnd.dropElement).children()[0].style.opacity = '1';
}

// Function to handle drag end
function handleDragEnd(e) {
    logEvent(e);
    dnd.dragElement.style.opacity = '1';
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

function logEvent(e) {
    console.log(e.type);
    console.log(e.originalEvent.target);
}

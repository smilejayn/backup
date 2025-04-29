{
    var proj = app.project; // Get the project
    var selectedItems = proj.selection;

    for (var i = 0; i < selectedItems.length; i++) { // Iterate through all selected items
        var item = selectedItems[i];
        
        // Get the item's size
        var size = "[" + item.width + "*" + item.height + "]";

        // Check if color property exists
        var colorString = "";
        if (item.mainSource && item.mainSource.color) {
            var color = item.mainSource.color;

            // Convert the color values from normalized to standard 0-255 RGB values
            color = color.map(function(value) {
                return Math.round(value * 255);
            });

            // Convert RGB color array to HEX color string
            colorString = color.map(function(value) {
                var hex = value.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }).join('').toUpperCase();
        }

        colorString = colorString ? "#" + colorString : "Color_Not_Available";
        
        // Rename the item
        item.name = colorString + "//" + size;
    }
}
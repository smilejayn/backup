// Function to set time indicator to 3 seconds in a composition
function setTimeIndicatorToThreeSeconds(comp) {
    // Setting the time to  seconds
    comp.time = 4;
}

// Function to process all compositions in the project
function setTimeIndicatorToThreeSecondsInAllComps() {
    var allItems = app.project.items;

    // Start Undo Group
    app.beginUndoGroup("Set Time Indicator to 3 Seconds in All Comps");

    // Loop through all items in the project
    for (var i = 1; i <= allItems.length; i++) {
        // Process only composition items
        if (allItems[i] instanceof CompItem) {
            setTimeIndicatorToThreeSeconds(allItems[i]);
        }
    }

    // End Undo Group
    app.endUndoGroup();
}

// Run the function
setTimeIndicatorToThreeSecondsInAllComps();

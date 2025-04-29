var numSeqs = app.project.sequences.numSequences;

for (i = 0; i <  numSeqs; i++){
    var c=app.project.sequences[i].getSettings();
    c.compositeLinearColor=0;
    app.project.sequences[i].setSettings(c);
}

alert("Done!");



var myPanel = (function() {
    var myScriptPal = this;
    var myButton;

    function myScriptPal_buildUI(thisObj) {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "My Panel", undefined, {resizeable:true});

        myButton = myPanel.add("button", undefined, "Run Script");

        myButton.onClick = function() {
            eval(app.activeScript);
        }

        return myPanel;
    }

    var myPanelPal = myScriptPal_buildUI(this);

    if (myPanelPal != null && myPanelPal instanceof Window) {
        myPanelPal.center();
        myPanelPal.show();
    }
})();

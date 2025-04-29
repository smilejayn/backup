
var numSeqs = app.project.sequences.numSequences;

for (i = 0; i <  numSeqs; i++){
    var c=app.project.sequences[i].getSettings();
    c.compositeLinearColor=0;
    app.project.sequences[i].setSettings(c);
}

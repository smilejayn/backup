


for (i = 0; i <  700; i++){
    var c=app.project.sequences[i].getSettings();
    c.compositeLinearColor=0;
    app.project.sequences[i].setSettings(c);
}
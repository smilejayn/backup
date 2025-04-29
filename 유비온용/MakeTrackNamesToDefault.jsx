var project = app.project;

// Fetch all sequences from the project
var allSequences = getAllSequences(project.rootItem);

// Debug: Inspect the properties of the children of the first sequence
var firstSequence = allSequences[0];
var childProperties = [];
for (var prop in firstSequence.children) {
    childProperties.push(prop);
}
alert("Properties of the children of the first sequence: " + childProperties.join(", "));

function getAllSequences(item) {
    var sequences = [];
    for (var i = 0; i < item.children.numItems; i++) {
        var childItem = item.children[i];
        if (childItem.type === ProjectItemType.BIN) {
            sequences = sequences.concat(getAllSequences(childItem));
        } else if (childItem.type === ProjectItemType.SEQUENCE) {
            sequences.push(childItem);
        }
    }
    return sequences;
}

// Premiere Pro Script to replace 'ep08.mp4' with 'ep12.mp4' in sequences

(function() {
    // Function to find project item by name
    function findProjectItemByName(rootItem, name) {
        for (var i = 0; i < rootItem.children.numItems; i++) {
            var item = rootItem.children[i];
            if (item.name === name) {
                return item;
            }
            if (item.type === ProjectItemType.BIN) {
                var foundItem = findProjectItemByName(item, name);
                if (foundItem) {
                    return foundItem;
                }
            }
        }
        return null;
    }

    // Access the project
    var project = app.project;
    if (!project) {
        alert("No project open");
        return;
    }

    // Find 'ep12.mp4' in the project panel
    var replacementClip = findProjectItemByName(project.rootItem, "ep12.mp4");
    if (!replacementClip) {
        alert("'ep12.mp4' not found in project panel");
        return;
    }

    // Iterate over each sequence in the project
    for (var i = 0; i < project.sequences.numItems; i++) {
        var sequence = project.sequences[i];

        // Check each track for clips to replace
        for (var t = 0; t < sequence.videoTracks.numTracks; t++) {
            var track = sequence.videoTracks[t];
            for (var c = 0; c < track.clips.numItems; c++) {
                var clip = track.clips[c];
                if (clip.projectItem.name === "ep08.mp4") {
                    clip.replace(replacementClip);
                }
            }
        }
    }

    alert("Replacement complete");
})();

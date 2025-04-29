var project = app.project;
var sequences = project.sequences;
var projectItems = project.rootItem.children;

// Create or open the text file for writing
var file = new File("C:/matched_clips.txt");  // Adjust the path as needed
if (!file.exists) {
    // If the file doesn't exist, create it
    file.open("w");
} else {
    // If the file exists, append to it
    file.open("a");
}

// Traverse through all sequences
for (var i = 0; i < sequences.numSequences; i++) {
    var sequence = sequences[i];
    var videoTracks = sequence.videoTracks;

    // Traverse through all video tracks of the sequence
    for (var j = 0; j < videoTracks.numTracks; j++) {
        var track = videoTracks[j];
        var trackClips = track.clips;

        // Traverse through all clips of the video track
        for (var k = 0; k < trackClips.numItems; k++) {
            var clip = trackClips[k];
            var clipName = clip.projectItem.name;

            // Find matching item in the project panel
            for (var l = 0; l < projectItems.numItems; l++) {
                var item = projectItems[l];

                // If a matching item is found (based on name)
                if (item.name === clipName) {
                    // Write clip name to the file
                    file.writeln(clipName);
                }
            }
        }
    }
}

// Close the file
file.close();

alert("Matched clips have been written to 'matched_clips.txt'");

var originalStartTimes = [];

for (var seqIndex = 0; seqIndex < app.project.sequences.length; seqIndex++) {
    var sequence = app.project.sequences[seqIndex];

    // Check if the sequence name starts with 'PSD'
    if (sequence.name.indexOf('PSD') === 0 && sequence.videoTracks.numTracks > 0) {
        var secondsToMove = 0.2; // Start with a delay of 0.2 seconds, reset for each sequence.

        for (var trackNumber = 1; trackNumber < sequence.videoTracks.numTracks; trackNumber++) {
            var track = sequence.videoTracks[trackNumber];

            // Move all clips in the track
            moveClipsInTrack(track, secondsToMove);

            // Set end time to 90 seconds for all clips in the track
            setEndTimeInTrack(track);

            secondsToMove += 0.2; // Increase the delay by 0.2 seconds for the next track.
        }

        // Set end time to 90 seconds for all clips in the first track
        var firstTrack = sequence.videoTracks[0];
        setEndTimeInTrack(firstTrack);
    }
}

function moveClipsInTrack(track, secondsToMove) {
    // Move all clips in the track.
    for (var i = 0; i < track.clips.numItems; i++) {
        var clip = track.clips[i];
        // Save the original start time of the clip
        originalStartTimes.push({ clip: clip, startTime: clip.start.seconds });
        var newStartTime = clip.start.seconds + secondsToMove;
        clip.start = newStartTime;
    }
}

function setEndTimeInTrack(track) {
    // Set end time to 90 seconds for all clips in the track
    for (var i = 0; i < track.clips.numItems; i++) {
        var clip = track.clips[i];
        var newEndTime = clip.start.seconds + 90; // Set the end time to 90 seconds after the clip's start time
        clip.end = newEndTime;
    }
}

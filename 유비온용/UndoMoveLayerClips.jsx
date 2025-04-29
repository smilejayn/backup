// Loop over the saved start times and apply them to the clips
for (var i = 0; i < originalStartTimes.length; i++) {
    var clipAndTime = originalStartTimes[i];
    clipAndTime.clip.start = clipAndTime.startTime;
}

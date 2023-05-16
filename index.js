function getLocalTime(timeZoneIdentifier, pstTime) {
    try {
        let timeZoneAbbr = "";
        // Define the time zone as a string, for example "America/Los_Angeles"
        let timeZone = "America/Los_Angeles";
        let now = new Date();
        // Get the UTC time offset in minutes for the local time zone
        let localOffset = now.getTimezoneOffset();
        // Calculate the local UTC offset in milliseconds
        let localOffsetMs = localOffset * 60 * 1000;
        // Create a new Date object with the desired time zone
        let caTime = new Date(pstTime.toLocaleString("en-US", { timeZone: timeZone }));
        // Check if the time zone abbreviation is "PDT" or "PST"
        if (caTime.toLocaleString("en-US", { timeZone: timeZone, timeZoneName: "short" }).indexOf("PDT") !== -1) {
            timeZoneAbbr = "PDT";
        } else {
            timeZoneAbbr = "PST";
        }
        // Create a new Date object for the notification time
        let notifDate = new Date(pstTime + ' ' + timeZoneAbbr);
        // Get the UTC time in milliseconds for the PST time
        let notifUTCTime = notifDate.getTime();
        // Calculate the local time in milliseconds
        let localNotifTime = notifUTCTime - localOffsetMs;
        // Create a new Date object for the local time
        let localNotifDate = new Date(localNotifTime);
        // Convert the local date to a string in the format YYYY-MM-DD HH:mm:ss
        var localNotifTimeString = localNotifDate.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '');
        return localNotifTimeString;
    } catch (err) {
        console.log("Error encountered while converting. Error : ", err);
    }
}

module.exports = getLocalTime
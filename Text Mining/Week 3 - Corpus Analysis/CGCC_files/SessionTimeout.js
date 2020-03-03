//Auto-Sign Out variables
var timeOutTimerID = 0;
var signOutUrl = "";
var serviceUrl = "";
var timeOutMinutes = 0;

//Stops timers when an async request begins
function AutoTimeOutBeginAsyncRequest(sender, args) {
    StopSignOutTimer();
}

//Restarts the warning timer when an async request ends
function AutoTimeOutEndAsyncRequest(sender, args) {
    StartSignOutTimer();
}

//Initializes the auto-signout mechanism
function InitAutoSignOut(pSignOutUrl, pServiceUrl, pTimeoutMinutes) {

    signOutUrl = pSignOutUrl;
    serviceUrl = pServiceUrl;
    timeOutMinutes = pTimeoutMinutes;

    //Start the count down until we auto signout
    StartSignOutTimer();
}


//Starts the timer to perform the forced sign out
function StartSignOutTimer() {

    if (timeOutTimerID == 0) {
        timeOutTimerID = window.setInterval(OnTimeOut, timeOutMinutes * 60000);
    }
}

//Fires when the signout timer expires
function OnTimeOut() {
    GetRemainingSessionMinutes();
}

//Cancels the auto-signout timer
function StopSignOutTimer() {

    //Stop the sign out time
    if (timeOutTimerID != 0) {
        window.clearInterval(timeOutTimerID);
        timeOutTimerID = 0;
    }
}

function SignOut() {
    StopSignOutTimer();
    window.location.href = signOutUrl;
}

function GetRemainingSessionMinutes() {

    $.ajax({
        url: serviceUrl,
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data.GetSessionRemainingMinutesResult.Success) {

                var remainingMinutes = data.GetSessionRemainingMinutesResult.Data;

                if (remainingMinutes <= 0) {
                    SignOut();
                }
                else {

                    //restart the timer in x minutes minus 1 as a buffer
                    if (remainingMinutes > 1)
                        remainingMinutes -= 1;

                    StopSignOutTimer();
                    timeOutMinutes = remainingMinutes;
                    StartSignOutTimer()

                }
            }

        }
    });
}

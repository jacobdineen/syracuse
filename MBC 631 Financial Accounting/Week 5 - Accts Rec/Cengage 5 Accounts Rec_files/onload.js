function OnLoadCallback()
{
    this.onloadSafariWatchDog;
    
    this.stop = function()
    {
       clearInterval(this.onloadSafariWatchDog);
    };
    
    this.doOnloadEvent = function(onloadHandler)
    {
        if (this.isSafari())
        {
        	var that = this;
            this.onloadSafariWatchDog = setInterval(
                function() {
                    if (document.readyState=="complete")
                    {
                        onloadHandler();
                        that.stop();
                    }
                }, 1000);
        }
        else
        {
            if (window.attachEvent)
            {
                window.attachEvent('onload', onloadHandler);
            }
            else if (window.addEventListener)
            {
                window.addEventListener('load', onloadHandler, false);
            }
        }
    };
    
    this.isSafari = function()
    {
        var b = navigator.userAgent;
        return (b != null && b != "undefined" && b.indexOf("Safari") != -1);
    };
}

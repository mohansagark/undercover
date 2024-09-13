function checkDevice() {
  var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  var userAgent = navigator.userAgent + "";
  var element = document.getElementById("root");
  if (width > 990) {
    if (userAgent.indexOf("iPad") > -1) {
      element.className = "tablet";
    } else if (userAgent.indexOf("iPad") < 0 && userAgent.indexOf("iPad") < 0) {
      element.className = "desktop";
    }
  }
  if (width > 767 && width < 992) {
    element.className = "tablet";
  }
  if (width < 768) {
    element.className = "phone";
  }
}
window.onresize = function () {
  setTimeout(function () {
    checkDevice();
  }, 0);
};

window.onload = function () {
  checkDevice();
  if (typeof history.pushState === "function") {
    history.pushState("backward", null, null);
    window.onpopstate = function () {
      history.pushState("forward", null, null);
      // Handle the back (or forward) buttons here
      // Will NOT handle refresh, use onbeforeunload for this.
    };
  } else {
    var ignoreHashChange = true;
    window.onhashchange = function () {
      if (!ignoreHashChange) {
        ignoreHashChange = true;
        window.location.hash = Math.random();
        // Detect and redirect change here
        // Works in older FF and IE9
        // * it does mess with your hash symbol (anchor?) pound sign
        // delimiter on the end of the URL
      } else {
        ignoreHashChange = false;
      }
    };
  }
};

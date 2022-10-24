var oldHref = document.location.href;
checkURL();


//function to check url and redirect if needed
function checkURL() {
  let l = location.href;
  if (l.startsWith('https://www.youtube.com/shorts/')) {
    console.log('YTShorts2Vids (' + chrome.runtime.getManifest().version + ') URL Redirected');
    console.log('Old URL: ' + l);
    l = l.replace('https://www.youtube.com/shorts/', '');
    l = 'https://www.youtube.com/watch?v=' + l;
    console.log('New URL:' + l);
    window.location.replace(l);
  }
}

//on link change, check url again
window.onload = function() {
  var bodyList = document.querySelector("body")

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        checkURL();
      }
    });
  });

  var config = {
    childList: true,
    subtree: true
  };

  observer.observe(bodyList, config);
};

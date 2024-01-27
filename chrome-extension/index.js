checkURL();

//function to check url and redirect if needed
function checkURL() {
  let l = location.href;
  if (l.startsWith('https://www.youtube.com/shorts/')) {
    console.log(`YTShorts2Vids (${chrome.runtime.getManifest().version}) URL Redirected`);
    console.log(`Old URL: ${l}`);
    l = l.replace('https://www.youtube.com/shorts/', '');
    l = 'https://www.youtube.com/watch?v=' + l;
    console.log(`New URL: ${l}`);
    window.location.replace(l);
  }
}

//on link change, check url again
const observeUrlChange = () => {
  let oldHref = document.location.href;
  const body = document.querySelector("body");
  const observer = new MutationObserver(mutations => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      checkURL();
    }
  });
  observer.observe(body, {
    childList: true,
    subtree: true
  });
};

window.onload = observeUrlChange;

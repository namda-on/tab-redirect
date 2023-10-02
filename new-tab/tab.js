chrome.storage.sync.get(["url"]).then((result) => {
  console.log("result", result);
  if (result.url) {
    window.location.href = result.url;
  }
});

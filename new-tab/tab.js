chrome.storage.sync.get(["url"]).then((result) => {
  if (result.url && Array.isArray(result.url)) {
    const array = result.url;

    let randomValue = array[Math.floor(Math.random() * array.length)];
    window.location.href = randomValue;
  }
});

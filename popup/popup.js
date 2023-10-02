const urlRegex =
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

const $saveButton = document.querySelector("#save-btn");
const $input = document.querySelector("#url-input");

chrome.storage.sync.get(["url"]).then((result) => {
  $input.value = result.url;
});

if ($saveButton !== null) {
  $saveButton.addEventListener("click", () => {
    const url = $input.value;
    chrome.storage.sync.set({ url }).then(() => {
      window.close();
    });
  });
}

if ($input !== null) {
  $input.addEventListener("input", (e) => {
    if (urlRegex.test(e.currentTarget.value)) {
      $saveButton.disabled = false;
    } else {
      $saveButton.disabled = true;
    }
  });
}

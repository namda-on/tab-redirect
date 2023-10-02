const urlRegex =
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

const $saveButton = document.querySelector("#save-btn");
const $input = document.querySelector("#url-input");
const $urlList = document.getElementById("url-list");

let urlList = [];

const makeListElement = (v = "") => {
  const element = document.createElement("li");
  element.className = "url-list-item";
  element.textContent = v;
  return element;
};

const deleteItem = (url) => {
  //TODO : unique 한 id로 변경
  const idx = urlList.findIndex((v) => v === url);
  if (idx !== -1) {
    urlList.splice(idx, 1);
    chrome.storage.sync.set({ url: urlList });
    displayUrlList();
  }
};

const displayUrlList = () => {
  $urlList.innerHTML = "";

  urlList.map((url) => {
    const listItem = makeListElement(url);
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "X";
    listItem.appendChild(deleteButton);
    deleteButton.onclick = () => {
      deleteItem(url);
    };

    $urlList.appendChild(listItem);
  });
};

chrome.storage.sync.get(["url"]).then((result) => {
  if (result.url && Array.isArray(result.url)) {
    urlList = result.url;
    displayUrlList();
  }
});

if ($saveButton !== null) {
  $saveButton.addEventListener("click", () => {
    urlList.push($input.value);
    chrome.storage.sync.set({ url: urlList });
    displayUrlList();
    $input.value = "";
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

  $input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      $saveButton.click();
    }
  });
}

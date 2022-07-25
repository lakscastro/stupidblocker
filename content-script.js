window.onload = async function (e) {
  const href = new URL(window.location.href);

  let avoidUrls = await getUrls();
  const ul = document.getElementById("urls");

  if (
    (() => {
      for (const url of avoidUrls) {
        if (href.host === url) return true;
      }

      return false;
    })()
  ) {
    return (window.location.href =
      "https://gist.githubusercontent.com/alexrintt/215548b94ac976bd4aaeec99ecf88a0a/raw/05193e0706330fdd0f63fb609aa7b7bc9693e09b/woao.txt");
  }

  function renderUrls(urls = avoidUrls) {
    if (!ul) return;
    ul.innerHTML = "";

    for (const url of urls) {
      const node = document.createElement("li");

      node.textContent = url;

      node.ondblclick = async (e) => {
        avoidUrls = avoidUrls.filter((u) => u !== url);
        await setUrls(avoidUrls);
        e.target.remove();
      };

      ul.appendChild(node);
    }
  }

  async function setUrls(urls) {
    await chrome.storage.sync.set({ avoidUrls: urls });

    return await getUrls();
  }

  async function getUrls() {
    return (await chrome.storage.sync.get("avoidUrls"))?.avoidUrls ?? [];
  }

  const button = document.getElementById("add-url");
  const input = document.getElementById("newurl");

  onkeydown = (e) => {
    if (e.key === "Enter") {
      if (button && input) {
        button.click();
        input.value = "";
      }
    }
  };

  if (!!button && !!input) {
    button.onclick = async (e) => {
      const value = input.value?.trim();

      if (!value) return;

      avoidUrls.push(value);

      renderUrls(await setUrls(avoidUrls));
    };
  }

  renderUrls();
};

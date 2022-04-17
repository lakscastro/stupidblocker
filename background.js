chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ avoidUrls: [] }, function () {
    console.log("Default URLs set as an empty array []  ");
  });
});

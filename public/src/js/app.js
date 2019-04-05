var deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(function() {
    console.log("service worker registered");
  });
}

window.addEventListener("beforeinstallprompt", function(event) {
  console.log("before install prompt fired");
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject({ code: 500, message: "fucked up" });
  }, 3000);
});

fetch("https://httpbin.org/ip")
  .then(res => {
    console.log(res);
    return res.json();
  })
  .then(data => {
    console.log(data);
  });

fetch("https://httpbin.org/post", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  mode: "cors",
  body: JSON.stringify({ message: "Does this work" })
})
  .then(res => {
    console.log(res);
    return res.json();
  })
  .then(data => {
    console.log(data);
  });

promise
  .then(text => {
    return text;
  })
  .then(newText => {
    console.log(newText);
  })
  .catch(err => {
    console.log(err.code, err.message);
  });

console.log("outside promise");

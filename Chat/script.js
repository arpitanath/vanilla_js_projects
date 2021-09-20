(function () {
  let nam = document.getElementById("setName");
  let nameSubmitBtn = document.getElementById("display_submit");
  let nameInp = document.getElementById("fname");
  let tbody = document.getElementById("t_body");
  let fragment = document.createDocumentFragment();
  nam.innerHTML = "Anonymous";
  let enteredName = "Anonymous",
    searchText;
  nameSubmitBtn.addEventListener("click", setDisplayName);

  let searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", searchMessage);

  let searchInput = document.getElementById("searchText");

  function setDisplayName(e) {
    e.preventDefault();
    enteredName = nameInp.value.trim();
    nam.innerHTML = enteredName !== "" ? enteredName : "Anonymous";
  }

  let inputField = document.getElementById("messageInput");
  let chatDisplay = document.getElementById("chatDisp");
  let typing = document.getElementById("typing");

  function searchMessage(e) {
    e.preventDefault();
    searchText = searchInput.value.trim();
    localData = localStorage.getItem("chat");
    localData = JSON.parse(localData);
    if (tbody.innerHTML) {
      tbody.innerHTML = "";
    }
    addChattoDOM(localData, searchText);
  }

  let displayChat = document.getElementById("chatDisp");
  if (!localStorage.getItem("chat")) {
    localStorage.setItem("chat", JSON.stringify([]));
  }
  let chatHistory = JSON.parse(localStorage.getItem("chat"));
  let send = document.getElementById("sendMessage");
  let i = 0;
  send.addEventListener("click", function () {
    if (tbody.innerHTML) {
      tbody.innerHTML = "";
    }
    if (document.getElementById("messageInput").value == "") {
      alert("please Enter something in Chat....");
      return;
    }

    let message = {
      name: enteredName,
      text: document.getElementById("messageInput").value,
      dateTime:
        new Date().toLocaleTimeString() + " " + new Date().toDateString(),
    };
    chatHistory.push(message);
    document.getElementById("messageInput").value = "";
    localStorage.setItem("chat", JSON.stringify(chatHistory));
    localData = localStorage.getItem("chat");
    localData = JSON.parse(localData);
    addChattoDOM(localData, searchText);
  });

  setInterval(function () {
    localData = localStorage.getItem("chat");
    localData = JSON.parse(localData);
    if (!searchText) {
      if (tbody.innerHTML) {
        tbody.innerHTML = "";
      }
      addChattoDOM(localData, searchText);
    }
  }, 6000);

  async function  addChattoDOM(localData, searchText = void 0) {
    for (let i = 0; i < localData.length; i++) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.id = localData[i].dateTime;
      let templateDiv;
      const regex = RegExp(searchText, "g");
      let txt = document.createTextNode(localData[i].text);
      if (searchText) {
        let p1 = document.createElement("p");
        templateDiv =
          "<div class='message'>" +
          "<p class='user'>" +
          localData[i].name +
          " " +
          localData[i].dateTime +
          "<div class='clear'></div>" +
          "<p class='chatp messageChat'>" +
          localData[i].text
            .toLowerCase()
            .replace(regex, "<mark>" + searchText + "</mark>") +
          "</p>";
      } else {
        const isValidURL = isUrlValid(localData[i].text);
        const isValidImage = isValidURL ? await checkImage(localData[i].text) : false;
        const element = !isValidURL
          ? "<p class='messageChat'>" + localData[i].text + "</p>"
          : isValidImage
          ? `<img src =${localData[i].text} width="500" height="600">` +
          "</img>"
          : `<a href =${localData[i].text} target='_blank'>` +
            localData[i].text +
            "</a>";
        templateDiv =
          "<div class='message'>" +
          "<p class='user'>" +
          localData[i].name +
          " " +
          localData[i].dateTime +
          "</p>" +
          element +
          "<div class='clear'></div>" +
          "</div>" +
          "<p class='datetime'>" +
          "</p>" +
          "<div class='clear'></div>";
      }

      const p = document.createElement("p");
      p.className = "chatp";
      p.innerHTML = templateDiv;
      cell.appendChild(p);
      row.appendChild(cell);
      fragment.appendChild(row);
    }
    tbody.appendChild(fragment);
  }

  function isUrlValid(userInput) {
    var regexQuery =
      "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
    var url = new RegExp(regexQuery, "i");
    return url.test(userInput);
  }

  function checkImage(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

})();

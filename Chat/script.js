(function() {
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
  send.addEventListener("click", function() {
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
        new Date().toLocaleTimeString() + " " + new Date().toDateString()
    };
    chatHistory.push(message);
    document.getElementById("messageInput").value = "";
    localStorage.setItem("chat", JSON.stringify(chatHistory));
    localData = localStorage.getItem("chat");
    localData = JSON.parse(localData);
    addChattoDOM(localData, searchText);
  });

  setInterval(function() {
    localData = localStorage.getItem("chat");
    localData = JSON.parse(localData);
    if (!searchText) {
      if (tbody.innerHTML) {
        tbody.innerHTML = "";
      }
      addChattoDOM(localData, searchText);
    }
  }, 3000);

  function addChattoDOM(localData, searchText = void 0) {
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
           " "+
          localData[i].dateTime +
          "<div class='clear'></div>"+
          "<p class='chatp messageChat'>" +
          localData[i].text
            .toLowerCase()
            .replace(regex, "<mark>" + searchText + "</mark>") +
          "</p>" ;
      } else {
        templateDiv =
          "<div class='message'>" +
          "<p class='user'>" +
          localData[i].name +
          " " +
          localData[i].dateTime +
          "</p>" +
          "<p class='messageChat'>" +
          localData[i].text +
          "</p>" +
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

  function validURL(str) {
    let pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }
})();

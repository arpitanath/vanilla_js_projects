fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => addDataToDOM(data));

const container = document.getElementById("container");

function addDataToDOM(data, isChild = "false", parent, level = 0) {
  let keys = Object.keys(data);
  if (isChild == "true") {
    level++;
  }
  for (let i = 0; i < keys.length; i++) {
    const element = document.createElement("div");
    const parentID = parent ? parent.id : "";
    element.id = `${parentID}+${keys[i]}`;
    element.innerHTML = keys[i];
    if (isChild == "true") {
      parent.appendChild(element);
      element.classList.add("child");
      element.style.paddingLeft = `${level * 10}px`;
    } else {
      container.appendChild(element);
      element.classList.add("parent");
    }
    if (data[keys[i]].constructor === Object) {
      element.addEventListener("click", function (e) {
        e.stopPropagation();
        if (
          !document.getElementById(
            `${element.id}+${Object.keys(data[keys[i]])[0]}`
          )
        ) {
          addDataToDOM(data[keys[i]], "true", element, level);
        } else {
          return;
        }
      });
    }
  }
}

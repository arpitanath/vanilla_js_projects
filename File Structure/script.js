const backendData = [
  {
    id: "1",
    name: "Office Map",
  },
  {
    id: "2",
    name: "New Employee Onboarding",
    children: [
      {
        id: "8",
        name: "Onboarding Materials",
      },
      {
        id: "9",
        name: "Training",
      },
    ],
  },
  {
    id: "3",
    name: "Office Events",
    children: [
      {
        id: "6",
        name: "2018",
        children: [
          {
            id: "10",
            name: "Summer Picnic",
          },
          {
            id: "11",
            name: "Valentine's Day Party",
          },
          {
            id: "12",
            name: "New Year's Party",
          },
        ],
      },
      {
        id: "7",
        name: "2017",
        children: [
          {
            id: "13",
            name: "Company Anniversary Celebration",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Public Holidays",
  },
  {
    id: "5",
    name: "Vacations and Sick Leaves",
  },
];

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(resolve, 100, backendData);
  });
}

const container = document.getElementById("container");

fetchData().then((res) => {
  addDataToDom(res, (level = 0), container);
});

function adjustArrow(element) {
  if (element.classList.contains("expanded")) {
    for (let i = 0; i < element.children.length; i++) {
      element.children.item(i).style.display = "none";
    }
    element.classList.remove("expanded");
    element.classList.add("closed");
  } else {
    for (let i = 0; i < element.children.length; i++) {
      element.children.item(i).style.display = "block";
    }
    element.classList.remove("closed");
    element.classList.add("expanded");
  }
}

function addDataToDom(data, level = 0, parentElement) {
  if (
    parentElement.classList.contains("expanded") ||
    parentElement.classList.contains("closed")
  ) {
    parentElement.addEventListener("click", function (e) {
      e.stopImmediatePropagation();
      adjustArrow(parentElement);
    });
  }
  for (let i = 0; i < data.length; i++) {
    const element = document.createElement("div");
    element.classList.add("file");
    if (level !== 0) {
      element.style.paddingLeft = `${level * 20}px`;
      if (data[i]?.children) {
        element.classList.add("expanded");
      }
    }
    element.innerHTML = data[i]["name"];
    parentElement.appendChild(element);
    if (
      data[i].children ||
      (data[i].children && data[i].children.length !== 0)
    ) {
      element.classList.add("expanded");
      addDataToDom(data[i].children, level + 1, element);
    }
  }
}

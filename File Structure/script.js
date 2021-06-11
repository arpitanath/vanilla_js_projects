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

function adjustDisplay(element, className) {
  for (let i = 0; i < element.children.length; i++) {
    element.children.item(i).style.display = className;
  }
}

function adjustClassList(element, className) {
  const classToBeAdded = className == "expanded" ? "closed" : "expanded";
  element.classList.remove(className);
  element.classList.add(classToBeAdded);
}

function adjustArrow(element) {
  if (element.classList.contains("expanded")) {
    adjustDisplay(element, "none");
    adjustClassList(element, "expanded");
  } else {
    adjustDisplay(element, "block");
    adjustClassList(element, "closed");
  }
}

function addClassList(element, className) {
  element.classList.add(className);
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

    if (data[i]?.children) {
      addClassList(element, "expanded");
    } else {
      addClassList(element, "file");
    }

    if (level !== 0) {
      element.style.paddingLeft = `${level * 20}px`;
    }

    element.innerHTML = data[i]["name"];
    parentElement.appendChild(element);

    if (
      data[i].children ||
      (data[i].children && data[i].children.length !== 0)
    ) {
      addClassList(element, "expanded");
      addDataToDom(data[i].children, level + 1, element);
    }
  }
}

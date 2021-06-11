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

let data;
const container = document.getElementById("container");

fetchData().then((res) => {
  data = res;
  console.log(data);

  addDataToDom(data, (level = 0));
});

function addDataToDom(data, level = 0) {
  for (let i = 0; i < data.length; i++) {
    const element = document.createElement("div");
    element.classList.add("file");
    if (level !== 0) {
      element.style.paddingLeft = `${level * 10}px`;
      if(data[i]?.children){
        element.classList.add("expanded");
      }
    }
    element.innerHTML = data[i]["name"];
    container.appendChild(element);
    if (
      data[i].children ||
      (data[i].children && data[i].children.length !== 0)
    ) {
      element.classList.add("folder");
      addDataToDom(data[i].children, level + 1);
    }
  }
}

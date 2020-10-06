const table = document.getElementById("tbl_id");
const tbody = document.createElement("tbody");
const id = document.getElementById("heading");
const button = document.getElementById("search_btn");
const input = document.getElementById("input_id");

const table_length = 4;

let data;

//adding Event Listeners
id.addEventListener("click", sort);
button.addEventListener("click", search);

// creating Table Dynamically using API : http://dummy.restapiexample.com/api/v1/employees
fetch("http://dummy.restapiexample.com/api/v1/employees")
  .then(res => res.json())
  .then(resObj => {
    data = resObj.data;
    addTableToDOM(data);
  });

function addTableToDOM(data, index = 0) {
  console.log("index", index);
  for (i = index; i < index + table_length; i++) {
    const row = document.createElement("tr");
    for (j = 0; j < Object.keys(data[i]).length - 1; j++) {
      const cell = document.createElement("td");
      const txt = document.createTextNode(data[i][[Object.keys(data[i])[j]]]);
      cell.appendChild(txt);
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  pagination(data);
}

// add pagination
function pagination(data) {
  document.getElementById("pages").innerHTML = "";
  for (let i = 0; i < data.length / table_length; i++) {
    let button = document.createElement("button");
    button.innerHTML = i + 1;
    button.id = table_length * i;
    button.addEventListener("click", getPage);
    if (document.getElementById("pages")) {
      document.getElementById("pages").appendChild(button);
    }
  }
}

//getPage
function getPage(e) {
  tbody.innerHTML = "";
  let startPoint = e.path[0].id;
  addTableToDOM(data, parseInt(startPoint));
}

//Sort function
function sort(e) {
  tbody.innerHTML = "";
  let item = e.path.find(item => {
    return item;
  });
  data.sort(GetSortOrder(item.id)); //Pass the attribute to be sorted on
  addTableToDOM(data, 0);
}

function GetSortOrder(prop) {
  return function(a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}

//Search function
function search(e) {
  let results = [];
  let text = input.value.toLowerCase().trim();
  console.log(text);
  for (let i = 0; i < data.length; i++) {
    if (data[i].employee_name.toLowerCase().includes(text)) {
      console.log(data[i].employee_name);
      results.push(data[i]);
      tbody.innerHTML = "";
    }
  }
  addTableToDOM(results);
}

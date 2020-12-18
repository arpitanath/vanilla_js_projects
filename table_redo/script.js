(function(){
    const table = document.getElementById("tbl_id");
const search_button = document.getElementById("search_btn");
const search_input = document.getElementById("search_inp");
const tbody = document.createElement("tbody");
const tbl_heading = document.getElementById("tbl_heading");
const pages= document.getElementById("pages");
let data,searchText;
let pageLength=5;


//fetch employee data
fetch("./data.json")
  .then(res => res.json())
  .then(res => {
    data = res.data;
    addTableToDOM(data);
  })
  .catch(err => console.log("Oops", err));

//function to add table to DOM
function addTableToDOM(data,index=0) {
  for (let i = index; i < pageLength+index; i++) {
    const row = document.createElement("tr");
    row.addEventListener("click",openModal);
    for (let j = 0; j < Object.keys(data[i]).length - 1; j++) {
      const cell = document.createElement("td");
      if(searchText){
        const regex = RegExp(searchText,'g');
        const p= document.createElement("p");
        p.innerHTML=data[i][Object.keys(data[i])[j]].replace(regex, '<mark>'+searchText+'</mark>');
        cell.appendChild(p);
      }else{
        const text = document.createTextNode(data[i][Object.keys(data[i])[j]]);
        cell.appendChild(text);
      }
     
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  pagination(data);
}

function openModal(){
  let modal = document.getElementById("myModal");
  
  modal.style.display = "block";
}


window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target == modal) {
      modal.style.display = "none";
  }
}


function pagination(data){
    pages.innerHTML="";
    for(let i=0;i<Math.ceil(data.length/pageLength);i++){
        const page_btn= document.createElement("button");
        page_btn.innerHTML=i+1;
        page_btn.id=pageLength*i;
        if (document.getElementById("pages")) {
            document.getElementById("pages").appendChild(page_btn);
          }
        page_btn.addEventListener("click",getPages);
    }
}

function getPages(e){
tbody.innerHTML="";
let startPoint = e.path[0].id;
addTableToDOM(data,parseInt(startPoint));
}

//adding event Listeners
tbl_heading.addEventListener("click", sort);
search_button.addEventListener("click", search);

//sort function on every heading
function sort(e) {
  tbody.innerHTML = "";
  let itemId = e.path[0].id;
  if (itemId == "employee_name") data.sort(getSortedAlphabeticData(itemId));
  else data.sort(getSortedNumericData(itemId));
  addTableToDOM(data);
}

function getSortedNumericData(id) {
  return function(a, b) {
    return a[id] - b[id];
  };
}

function getSortedAlphabeticData(id) {
  return function(a, b) {
    if (a[id] > b[id]) {
      return 1;
    } else if (a[id] < b[id]) {
      return -1;
    }
    return 0;
  };
}

function search(e){
   
    searchText = search_input.value.toLowerCase().trim();
    console.log(searchText);
    let result =[];
    if(searchText == ""){
      alert("Please enter valid search text");
    }else{
     
      for(let i=0;i<data.length;i++){
        if(data[i].employee_name.toLowerCase().includes(searchText)){
            result.push(data[i]);
        }
    }
    if(result.length!=0){
      tbody.innerHTML = "";
      addTableToDOM(result);
    }
    else{
      alert("Nothing Matched!! Sorry");
    }
    
    }  
}
})();

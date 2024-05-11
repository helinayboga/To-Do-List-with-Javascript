const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;

// load items
loadItems();

eventListeners();

function eventListeners() {
  // submit event
  form.addEventListener("submit", addNewItem);
  // delete an item
  taskList.addEventListener("click", deleteItem);
  // delete all item
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
  todos = getItemsFromLS();
  todos.forEach(function (item) {
    createItem(item);
  });
}
// get items from local storage

function getItemsFromLS() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
// set item to Local Storage

function setItemToLS(newTodo) {
  todos = getItemsFromLS();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createItem(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(newTodo));

  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  li.appendChild(a);

  taskList.appendChild(li);
}

function addNewItem(e) {
  if (input.value === "") {
    alert("add new item");
  }

  // create Item

  createItem(input.value);

  setItemToLS(input.value);

  input.value = "";

  e.preventDefault();
}

//deleting an item

function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("Are you sure you want to delete this item?")) {
      //console.log(e.target);
      e.target.parentElement.parentElement.remove();
    }
  }
  e.preventDefault();
}

// Deleting all items

function deleteAllItems(e) {
  if (confirm("Are you sure you want to delete all items?")) {
    taskList.childNodes.forEach(function (item) {
      //console.log(item);
      if (item.nodeType === 1) {
        item.remove();
      }
    });
  }
}

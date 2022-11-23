const loginToken = localStorage.getItem("login-token");
if(!loginToken){
  window.location.pathname = "/login.html";
}

const elFormTodo = document.querySelector(".js-form-todo");
const elFormTodoInput = document.querySelector(".js-todo-input");
const elTodoList = document.querySelector(".list-todo");
const editForm = document.querySelector(".js-change-form");
const editInput = editForm.querySelector(".js-change-input");
const editBtn = document.querySelector(".edit-btn");
const todoTemp = document.querySelector(".item-temp").content;
// const modal = document.querySelector(".modal");
const frag = new DocumentFragment();


function renderTodos(arr, node){
  node.innerHTML = "";
  arr.forEach(item => {
    const temp = todoTemp.cloneNode(true);
    temp.querySelector(".user-id").textContent = `${item.id}.`;
    temp.querySelector(".user-todo").textContent = item.todo_value;
    temp.querySelector(".edit-btn").dataset.id = item.id;
    temp.querySelector(".delete-btn").dataset.id = item.id;
    frag.appendChild(temp);
  });
  node.appendChild(frag);
}

async function getTodos(){
  try {
    const res = await fetch("http://localhost:5000/todo", {
    headers : {
      Authorization : loginToken,
    },
  });
  const data = await res.json();
  renderTodos(data, elTodoList);
} catch (error) {
  console.log(error);
}
}

async function postTodos(){
  try {
    const res = await fetch("http://localhost:5000/todo", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json",
      Authorization : loginToken,
    },
    body : JSON.stringify({
      text: elFormTodoInput.value.trim()
    })

  });
} catch (error) {
  console.log(error);
}
}

getTodos();

elFormTodo.addEventListener("submit", evt => {
  evt.preventDefault();
  postTodos();
  getTodos();
})


async function deleteTodos(id){
  try {
    const res = await fetch(`http://localhost:5000/todo/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: loginToken
    },

  });
  const data = await res.json();
  // console.log(data);
  getTodos()
} catch (error) {
  console.log(error);
}
}

let changeText = "";

elTodoList.addEventListener("click", evt =>{
  if(evt.target.matches(".edit-btn")){
    const editBtnId = evt.target.dataset.id;
    editForm.addEventListener("submit", evt => {
      evt.preventDefault();
      changeText = editInput.value.trim();
      editTodos(editBtnId, changeText);
      editForm.reset()
    });
  }
  if(evt.target.matches(".delete-btn")){
    const deleteBtnId = evt.target.dataset.id;
    deleteTodos(deleteBtnId);
  }
});


async function editTodos(id, changeText){

  try {
    const res = await fetch(`http://localhost:5000/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: loginToken
    },
    body: JSON.stringify({
      text: changeText,
    })
  });
  const data = await res.json();
  getTodos()
} catch (error) {
  console.log(error);
}
}

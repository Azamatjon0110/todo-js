// const loginToken = localStorage.getItem("login-token");
// if(loginToken){
//   window.location.pathname = "/index.html";
// }

const elForm = document.querySelector(".js-form");
const elFormEmail = document.querySelector(".js-input-email");
const elFormPassword = document.querySelector(".js-input-password");

async function login (){
  try {
    const res = await fetch("http://localhost:5000/user/login", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      email: elFormEmail.value,
      password : elFormPassword.value,
    })

  });

  const data = await res.json();
  console.log(data.token);
  console.log(data);
  if(data.token){
    localStorage.setItem("login-token", data.token);
    window.location.pathname = "/index.html";
  }
} catch (error) {
  console.log(error);
}
}

elForm.addEventListener("submit", (evt)=>{
  evt.preventDefault();
  login()
})
const elForm = document.querySelector(".js-form");
const elFormEmail = document.querySelector(".js-input-email");
const elFormName  = document.querySelector(".js-input-name");
const elFormPhone = document.querySelector(".js-input-number");
const elFormPassword = document.querySelector(".js-input-password");


async function register (){
  try {
    const res = await fetch("http://localhost:5000/user/register", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      user_name: elFormName.value,
      phone : elFormPhone.value,
      email: elFormEmail.value,
      password : elFormPassword.value,
    })

  });

  const data = await res.json();
  console.log(data.token);
  console.log(data);
  if(data.token){
    // localStorage.setItem("token", data.token);
    window.location.pathname = "/index.html";
  }
} catch (error) {
  console.log(error);
}
}

elForm.addEventListener("submit", (evt)=>{
  evt.preventDefault();
  register()
})
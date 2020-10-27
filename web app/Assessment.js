console.log("wtf");
const signupForm2 = document.querySelector('#signup-form');


console.log("werwe");
const assForm = document.querySelector('#ass-form');
console.log(assForm);
assForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var email = document.getElementById("email").value;
    console.log("here");
    var data = {
        "age": document.getElementById("age").value,
        "distance": document.getElementById("distance").value,
        "fage": document.getElementById("fage").value,
        "rage": document.getElementById("rage").value,
        "genre": document.getElementById("genre").value
        
    }
    
    db.collection(email).doc("info").set({...data}).then((result) => {
    console.log("success", result);
      }).catch((result) => {
        console.log("error", result);
        response({type: "result", status: "error", data: result, request: data}); 
      });
    window.open ('main.html');
});

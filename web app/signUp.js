const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['email'].value;
    const password = signupForm['pwd'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        
        
        db.collection(email).add({...""}).then((result) => {
        console.log("success", result);
          }).catch((result) => {
            console.log("error", result);
            response({type: "result", status: "error", data: result, request: data}); 
          });
          
         window.open ('Assessment.html');
    })
    .catch(
            (error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                document.getElementById("warn").innerHTML = "Either your email is invalid or there is already a user with that email!";
            }
        );
        
    //window.close();
});
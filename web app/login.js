const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['email'].value;
    const password = loginForm['pwd'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        window.location.href = 'main.html';
    })
    .catch(
            (error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                document.getElementById("warn").innerHTML = "Sorry, invalid user credentials!";
            }
        );
});

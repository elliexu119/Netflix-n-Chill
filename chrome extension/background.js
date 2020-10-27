console.log("background");
setInterval(loadContent, 1000 * 5 ); 

var latitude = null; 
var longitude = null; 
var movies = []; 
var email = "noname"; 

var firebaseConfig = {
    apiKey: "AIzaSyDBkxQwPlVqAntHabVKC6l2uAMp-E1a2Ic",
    authDomain: "netflix-n-chi.firebaseapp.com",
    databaseURL: "https://netflix-n-chi.firebaseio.com",
    projectId: "netflix-n-chi",
    storageBucket: "netflix-n-chi.appspot.com",
    messagingSenderId: "225472206934",
    appId: "1:225472206934:web:2100d217a60b2d85d243f7",
    measurementId: "G-1GXMK6BW2N"
};
firebase.initializeApp(firebaseConfig);
var command = 'add'; 

var db = firebase.firestore();



chrome.runtime.onMessage.addListener(
  function(response, sender, sendResponse) {
      
    var data = response.message; 
    if (data[0] == 'loc') {
        if (latitude != data[1]) latitude = data[1]; 
        if (longitude != data[2]) longitude = data[2]; 
        console.log(latitude); 
        console.log(longitude);
    } else {
        movies.push(data);
        firebaseFunc(movies);
        //console.log(data);
    }
     
    //sendResponse({farewell: "goodbye"}); //talk to contentscript js
  });
  
function loadContent(){
    chrome.tabs.executeScript(null, {file: "contentScript.js"});
}


document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
   //console.log(movies);
   console.log("button pressed");
   //firebaseFunc();
    }, true);
    
}, false);

document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
    
    email = document.getElementById("email").value;
    document.getElementById("email").value = "Sucess!";
    console.log(email);
     
  }, true);
  
    
    
}, false);



function firebaseFunc(data){
    console.log("firebase");
    if (command == "add"){
        console.log("attempting to add");
        console.log("process msg add", {...data});
        db.collection(email).doc("movies").set({...data}, { merge: true }).then((result) => {
        console.log("success", result);
        //response({type: "result", status: "success", data: result, request: data});
      }).catch((result) => {
        console.log("error", result);
        response({type: "result", status: "error", data: result, request: data}); 
      });
    }
}


if (document.URL.includes('netflix.com/watch') == true){
    getGeolocation();

    var data = getNetflixData(); 
    console.log(data);

    chrome.runtime.sendMessage({message: data}, function(response) {
      //console.log(response.farewell); //get data back from background js
    });
}

function getNetflixData(){
    
    var title = null; 
    var time = null; 

    if (document.URL.includes('netflix.com/watch') == true){
        var a = document.documentElement.innerHTML;
        var classElement = document.getElementsByClassName('ellipsize-text');
        if (classElement.length != 0){ 
            //console.log(classElement[0].textContent); 
            title = classElement[0].textContent;
        }
        else console.log("could not get title"); 

        var ariaElement = document.querySelectorAll('[aria-valuetext]');
        if (ariaElement.length != 0 ){
            //console.log(ariaElement[0].ariaValueText);
            time = ariaElement[0].ariaValueText;
        }
        else console.log("could not get time");

    }

    else console.log("not netflix");
    var data = [title, time]; 
    return data; 
}

function getGeolocation(){
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
    console.log( "No location found.");
    
    }
}
function showPosition(position) {
  loc = "Latitude: " + position.coords.latitude + 
  " Longitude: " + position.coords.longitude;
  console.log(loc);
  var data = ['loc', position.coords.latitude, position.coords.longitude]; 
  chrome.runtime.sendMessage({message: data}, function(response) {});
}


/**

chrome.storage.sync.set({key: value}, function() {
    //  Data's been saved boys and girls, go on home
    value = title; 
});

chrome.storage.sync.get(["key"], function(result){
    console.log(result.key); 
    
});

**/
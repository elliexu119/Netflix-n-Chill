/**
document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
    
    chrome.tabs.getSelected(null, function(tab){
        console.log(tab.id);
        
    });
    
    
     
  }, true);
  
    
    
}, false);
**/
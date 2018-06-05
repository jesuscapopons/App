
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		 $( "#sortable" ).sortable();
		 $( "#sortable" ).disableSelection();
		 
		 Role.active=Role.STUDENT;
		 
		 if(Role.active=='TEACHER')
		 {
			Role.loadSubjects();
			Role.topMenuStart();
			Role.bottomMenuStart(); 
		 }else
		 {
			Role.showPendingActivities();
			Role.topMenuStart();
			Role.bottomMenuStudentStart();
			
			
		 }
		
		 
		 
    },

    
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
		FlipFlop.onDeviceReady();
    },

    // Update DOM 
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
  

        console.log('Received Event: ' + id);
    }
};

 


/*
//To see URLs

(function() {
    var xhr = {};
    xhr.open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function(method, url) {
        console.log(url);
        var i=url.indexOf('ew-box.com');
        if( i> 0){
          //  url = window.decodeURIComponent(url.substr(i));
            alert(url)
        }
        xhr.open.apply(this, arguments);
    };
})(window);


}
*/



var FlipFlop =
{
    pictureSource:'',   
  
    destinationType:'',  
    
	onDeviceReady:function () 
	{
		FlipFlop.pictureSource=navigator.camera.PictureSourceType;
		FlipFlop.destinationType=navigator.camera.DestinationType;
		
	},
  
    onPhotoFileSuccess:function(imageData) 
	{
      
		console.log(JSON.stringify(imageData));
		var counter = document.getElementById('counter');
		var items = [];
		var i=0;
		var add='';
		
		i=parseInt(counter.value)+1;
		counter.value=i;
        alert(imageData.length);
		if(imageData.length>250) add="data:image/jpeg;base64,"
		
		items.push( '<li id="pic-'
		+i+'" class="ui-state-default" style="display:block;"> <div style="display:flex;"><div style="flex:1;"><img class="imgUpload" style="height:40px;" id="dwnldImg-'
		+i+'" src="'+add+imageData+'" /></div><div style="flex:1;">PÀGINA '+ i
		+'</div>        <div style="flex:1;min-height: 50px;" class="close" onclick="FlipFlop.hidePicture(\''
		+i+'\');">  </div> </div>   </li>');
		
		
		$( "#sortable").html('');
		$( "#sortable").append(items.join( "" ));
		$( "#editorContent").html('');
		
    },
   
    
   capturePhotoWithFile:function() 
   {
         if(navigator.camera)navigator.camera.getPicture(FlipFlop.onPhotoFileSuccess, FlipFlop.onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
    },

     // Retrieve image file location from specified source
    getPhoto:function (source)
	{
   
     if(navigator.camera) navigator.camera.getPicture(FlipFlop.onPhotoFileSuccess, FlipFlop.onFail, { quality: 50,
        destinationType: FlipFlop.destinationType.FILE_URI,
        sourceType: source });
    },
	
    // Called if error
   onFail:function (message)
   {
      alert('Failed because: ' + message);
    },

   
	getImages:function ()
	{
		var i=0;
		$('.imgUpload').each(function() {
			i++;
			 
			FlipFlop.uploadPhoto($(this).attr('src'),$(this).attr('id'),i);
        });
    
    },

	uploadPhoto: function (imageURI,id,i) 
	{
        if(imageURI)
		{
			var options = new FileUploadOptions();
			options.fileKey = "pictureImage";
			options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
			options.mimeType = "image/jpeg";
			console.log(options.fileName);
			var params = new Object();
			params.name = options.fileName;
			params.order =i ;

			options.params = params;
			options.chunkedMode = false;

			var ft = new FileTransfer();
			ft.upload(imageURI, "http://ew-box.com:3001/api/upload", function(result){
				console.log('Imagen enviada correctamente');
				alert('ENVIADA');
				console.log(JSON.stringify(result));

			}, function(error){
			console.log('Error al enviar una imagen');
			alert('NO ENVIADA'+JSON.stringify(error));
				console.log(JSON.stringify(error));
			}, options);
		}
    },
	loadPendingCorrections:function () 
	{
		$.getJSON( "http://ew-box.com:3001/api/images", function( data ) {
		var items = [];
		var pending = [ "Ruffini", "Polinomios","funciones","gráficos","tablas","variaciones","geometria","valores","Ruffini", "Polinomios","funciones","gráficos","tablas","variaciones","geometria","valores","Ruffini", "Polinomios","funciones","gráficos","tablas","variaciones","geometria","valores"];
		
		var i=0;
		var url ='';
		$.each( data['images'], function( key, val ) {
     
		if(!(val['name']==""))
		{
			i=i+1;
			url = 'http://ew-box.com/api/uploads/'+val['name'];

			items.push( '<li id="pic-'
			+val['_id']+'" class="ui-state-default" style="display:block;" onclick="FlipFlop.cargarBody(\''+'./editor/index.html\',\''+ url +'\')"> <div style="display:flex;"><div style="flex:1;"><span class="handOver" style="cursor:pointer;" ><img class="imgDown" style="height:40px;" id="dwnldImg-'
			+val['_id']+'" src="'+url+'" /></span></div><div class="activity" style="flex:3;">'+pending[i]+' '+i
			+'</div>        <div style="flex:1;min-height: 50px;" class="close" onclick="FlipFlop.deletePicture(\''
			+val['_id']+'\');">  </div> </div>   </li>');

			window.requestFileSystem(window.PERSISTENT, 5 * 1024 * 1024, function (fs) {
			  console.log('file system open '+ ':'+ fs.name);
				// Make sure you add the domain name to the Content-Security-Policy <meta> element.
				// Parameters passed to getFile create a new file or return the file if it already exists.
				fs.root.getFile('downloaded-image.png', { create: true, exclusive: false }, function (fileEntry) {
					FlipFlop.downloadNow(fileEntry, url, true);

				}, FlipFlop.onFail);

			}, FlipFlop.onFail);

		}
		});
		$( "#sortable").html('');
		$( "#sortable").append(items.join( "" ));
		$( "#editorContent").html('');
		});
	},
	loadDoneCorrections:function () 
	{
		$.getJSON( "http://ew-box.com:3001/api/images", function( data ) {
		var items = [];
		var done = [ "Polinomios","funciones","gráficos","tablas","variaciones","geometria","valores","Ruffini", "Polinomios","funciones","gráficos","tablas",,"Ruffini", "Polinomios","funciones","gráficos","tablas","variaciones","geometria","valores","Ruffini", "Polinomios","funciones","gráficos","tablas","variaciones","geometria","valores","Ruffini", "Polinomios","funciones","gráficos","tablas","variaciones","geometria","valores"];
		var i=0;
		var url ='';
		$.each( data['images'], function( key, val ) {
     
		if(!(val['name']==""))
		{
			i=i+1;
			url = 'http://ew-box.com/api/uploads/'+val['name'];

			items.push( '<li id="pic-'
			+val['_id']+'" class="ui-state-default" style="display:block;"> <div style="display:flex;"><div style="flex:1;"><span class="handOver" style="cursor:pointer;" onclick="FlipFlop.cargarBody(\''+'./editor/index.html\',\''+ url +'\')"><img class="imgDown" style="height:40px;" id="dwnldImg-'
			+val['_id']+'" src="'+url+'" /></span></div><div class="activity" style="flex:1;"> '+done[i]+ i
			+'</div>        <div style="flex:1;min-height: 50px;" class="close" onclick="FlipFlop.deletePicture(\''
			+val['_id']+'\');">  </div> </div>   </li>');

			window.requestFileSystem(window.PERSISTENT, 5 * 1024 * 1024, function (fs) {
			  console.log('file system open '+ ':'+ fs.name);
				// Make sure you add the domain name to the Content-Security-Policy <meta> element.
				// Parameters passed to getFile create a new file or return the file if it already exists.
				fs.root.getFile('downloaded-image.png', { create: true, exclusive: false }, function (fileEntry) {
					FlipFlop.downloadNow(fileEntry, url, true);

				}, FlipFlop.onFail);

			}, FlipFlop.onFail);

		}
		});
		$( "#sortable").html('');
		$( "#sortable").append(items.join( "" ));
		$( "#editorContent").html('');
		});
	},
	
	downloadPicture:function () 
	{

		$.getJSON( "http://ew-box.com:3001/api/images", function( data ) {
		var items = [];
		var i=0;
		var url ='';
		$.each( data['images'], function( key, val ) {
     
		if(!(val['name']==""))
		{
			i=i+1;
			url = 'http://ew-box.com/api/uploads/'+val['name'];

			items.push( '<li id="pic-'
			+val['_id']+'" class="ui-state-default" style="display:block;"> <div style="display:flex;"><div style="flex:1;"><span class="handOver" style="cursor:pointer;" onclick="FlipFlop.cargarBody(\''+'./editor/index.html\',\''+ url +'\')"><img class="imgDown" style="height:40px;" id="dwnldImg-'
			+val['_id']+'" src="'+url+'" /></span></div><div class="activity" style="flex:1;">ARCHIVO '+ i
			+'</div>        <div style="flex:1;min-height: 50px;" class="close" onclick="FlipFlop.deletePicture(\''
			+val['_id']+'\');">  </div> </div>   </li>');

			window.requestFileSystem(window.PERSISTENT, 5 * 1024 * 1024, function (fs) {
			  console.log('file system open '+ ':'+ fs.name);
				// Make sure you add the domain name to the Content-Security-Policy <meta> element.
				// Parameters passed to getFile create a new file or return the file if it already exists.
				fs.root.getFile('downloaded-image.png', { create: true, exclusive: false }, function (fileEntry) {
					FlipFlop.downloadNow(fileEntry, url, true);

				}, FlipFlop.onFail);

			}, FlipFlop.onFail);

		}
		});
		$( "#sortable").html('');
		$( "#sortable").append(items.join( "" ));
		$( "#editorContent").html('');
		});

	},
	cargarBody: function(url,imgPath)
	{
		
		ImageEditor.init(imgPath);
		$( "#editorContent").load(url);
		$( "#sortable").html('');
		
		Role.bottomMenuImage(); 
		//ImageEditor.init();
		
	},
	downloadNow:function(fileEntry, uri, readBinaryData) {

    var fileTransfer = new FileTransfer();
    var fileURL = fileEntry.toURL();
    console.log("Item "+":"+uri+','+fileURL);

    fileTransfer.download(
        uri,
        fileURL,
			function (entry,i) {
				console.log("Successful download ");
				console.log("Download complete "+":" + entry.toURL());
				if (readBinaryData) {
				  console.log("Read the file ");
				  
				  FlipFlop.readBinaryFile(entry);
				  FlipFlop.displayImageByFileURL(entry);
				}
				else {
				   
				  console.log("Display by url");
				  FlipFlop.displayImageByFileURL(entry);
				}
			},
			function (error) {
				console.log("download_error_source " + error.source);
				console.log("download_error_target " + error.target);
				console.log("upload_error_code" + error.code);

			},
			null, //  false
			{
				//headers: {
				//    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
				//}
			}
		);
	},

	readBinaryFile:function (fileEntry) {

		fileEntry.file(function (file) {
			var reader = new FileReader();

			reader.onloadend = function() {
				console.log("ONLOAD:"+this.readyState);
				if (0)
				{
						  console.log("FILE_READ "+':' + this.result);
						  var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });

						   FlipFlop.displayImage(blob);
					}

			};

			reader.readAsArrayBuffer(file);

		}, FlipFlop.onFail);
	},

	displayImage:function(blob) 
	{

		 
		var objURL = window.URL.createObjectURL(blob);
		console.log(objURL +i);    
		var i =Math.random(100,999);
		var items=[];
		 items.push( '<li id="pic'
		 +i+'" class="ui-state-default" style="display:block;"> <div style="display:flex;"><div style="flex:1;"><img style="height:40px;" id="dwnldImg'
		 +i+'" src="'+objURL+'" /></div><div class="activity" style="flex:3;">ARCHIVO '+i+
		 +'</div>  <div style="flex:1;min-height: 50px;" class="close" onclick="FlipFlop.hidePicture('
		 +i+');">  </div> </div>   </li>');
		$( "#sortable").html('');
	   $( "#sortable").append(items.join( "" ));
	   $( "#editorContent").html('');

	},

	hidePicture:function(id)
    {

      var txt;
      var r = confirm("CONFIRMATION");
      if (r == true) 
	  {
		$("#pic-"+id).hide();
		$("#dwnldImg-"+id).attr('class', 'toBeRemoved');
		 
        
      } 

    },
	
	deleteSubject:function(id)
    {

      var txt;
      var r = confirm("CONFIRMATION");
      if (r == true) 
	  {
		$("#sub-"+id).hide();
        //FlipFlop.deleteSubjectFromServer(id);
      } 

    },
	
    deletePicture:function(id)
    {

      var txt;
      var r = confirm("CONFIRMATION");
      if (r == true) 
	  {
		$("#pic-"+id).hide();
        FlipFlop.deleteFromServer(id);
      } 

    },
	
	deleteFromServer: function(id)
	{

		 url='http://ew-box.com:3001/api/delete/'+id;

		 const options = {
		   data: { id:0, message: '' },
		   headers: { "Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials":"true" },
		   method:'delete'
		 };

		 cordova.plugin.http.sendRequest(url, options, function(response) {
		   // prints 200
		   console.log(response.status);
		 }, function(response) {
		   // prints 403
		   console.log(response.status);

		   //prints Permission denied
		   console.log(response.error);
		 });
	},
	displayImageByFileURL: function(fileEntry) 
	{
		//    var item = document.getElementById('pic');
		  //  var elem = document.getElementById('dwnldImg');

		//    elem.src = fileEntry.toURL();
			//  elem.style.visibility = "visible";
		//    elem.style.display = "block";
		//
		//    item.style.visibility = "visible";
		//    item.style.display = "block";
	}
	
		
}
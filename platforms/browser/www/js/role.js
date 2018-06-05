var Role =
{
	// Variables for referencing the canvas and 2dcanvas context
   STUDENT:'STUDENT',
   TEACHER:'TEACHER',
   active:'STUDENT',
   months:['Enero','Febrero','MArzo', 'Abril', 'Mayo','Junio','Julio','Septiembre','Octubre', 'Noviembre','Diciembre'],
   activeLanguage:'ES',
   languages:['ES','EN'],
    
    info: function()
    {
        //alert("I'm a "+Role.active);
		 console.log("I'm a "+Role.active);
    },
	
	 
    startStudent: function() 
	{
         Role.active=Role.STUDENT;
    },
	 
	startTeacher: function() 
	{
         Role.active=Role.TEACHER;
    },
	
	loadSubjects: function()
	{
		var subjects = [ "MATES 3 ESO", "CASTE 3 ESO", "INGLÉS 2 ESO"];
		var items = [];
		var subjectCode=0;
		$.each( subjects, function( index, value )
		{
			subjectCode=Math.floor(Math.random()*1000);
			items.push( '<li id="sub-'
			+index+'" class="ui-state-default" style="display:block;"> <div  style="display:flex;"><div style="flex:2;color:#000 !important;" class="subject" onclick="Role.loadActivities();"> '+ value
			+'</div>    <div style="flex:1;" class="code" onclick="FlipFlop.copySubject('+subjectCode+');"> ('+subjectCode+') </div>   <div style="flex:1;min-height: 50px;display:none;" class="close" onclick="FlipFlop.deleteSubject('+subjectCode+');">  </div> <div style="flex:1;min-height: 50px;display:none;" class="student" onclick="FlipFlop.showStudents('+subjectCode+');">  </div>    </div> </div>   </li>');
		});
		
		$( "#sortable").html('');
		$( "#sortable").append(items.join( "" ));
		$( "#editorContent").html('');
		Role.bottomMenuStart();
		
	},
		
	
	
	 
	
	loadActivities: function()
	{
		
		var activities = [ "Fracciones ", "Ruffini", "Polinomios", "Funciones"];
		var items = [];
		var day='1';
		var month= 0;
		var activityCode=0;
		$.each( activities, function( index, value )
		{
			activityCode=Math.floor(Math.random()*1000);
			month=Role.months[Math.floor(Math.random()*10)];
			day='2'+Math.floor(Math.random()*10);
			
			items.push( '<li id="activity-'
			+index+'" class="ui-state-default" style="display:block;text-align: center;"> <div style="display:flex;"><div style="flex:1; background-color:#e61a74;"><div style="font-size:25px;color:white;text-align: center">'+day+' </div> <div style="font-size:10px !important ;color:white;background-color:#e61a74;"> '+month+'</div></div><div class="activity" style="flex:4;" onclick=Role.showActivity('+index+')> '+ value
			+'</div>  <div style="flex:1;min-height: 50px;" class="close" onclick="Role.deleteActivity('+activityCode+');">  </div>  <div style="flex:1;min-height: 50px;" class="edit" onclick="Role.editActivity('+activityCode+');"></div> <div style="flex:1;min-height: 50px;" class="student" onclick="Role.studentListActivity('+activityCode+');">  </div>       </div> </div>   </li>');
		});
		
		$( "#sortable").html('');
		$( "#sortable").append(items.join( "" ));
		Role.topMenuStart();
		Role.bottomMenuActivitiesList();
		
	},
		
	newActivity: function()
	{
		$( "#editorContent").html('');
		$( "#datapicker_control").show();
		$( "#editorContent").load('./teacher/new_activity.html');
		$( "#sortable").html('');
		Role.bottomMenuNewActivity();
	},
	
	deleteActivity: function()
	{
		$(".close").show();
		$(".edit").hide();
		$(".student").hide();
		
	},
	editActivity: function()
	{
		$(".close").hide();
		$(".edit").show();
		$(".student").hide();
		
	},
	studentListActivity: function()
	{
		$(".close").hide();
		$(".edit").hide();
		$(".student").show();
		
	},
	deleteSubjects: function()
	{
		Role.loadSubjects();
		$(".close").show();
		$(".student").hide();
		$(".code").hide();
	},
	showStudents: function()
	{
		//Role.loadStudents();
		$(".student").show();
		$(".close").hide();
		$(".code").hide();
	},
	
	newSubject: function()
	{
		$( "#editorContent").load('./teacher/new_subject.html');
		$( "#sortable").html('');
	},
	showProfile: function()
	{
		$( "#editorContent").load('./teacher/profile.html');
		$( "#sortable").html('');
	},
	
	showActivity:function(id)
	{
		
		
		$( "#sortable").html('');
		$( "#editorContent").html('<a href="http://ew-box.com/ruffini_demo.pdf" class="embed" ></a>');
		$('a.embed').embedDOCS();
		//$('a.embed').embedDOCS({width: 900, height: 750});
		if(Role.active=='TEACHER')
		{
			Role.bottomMenuTeacherToBeCorrected()
		}else
		{
			Role.bottomMenuActivity();
		}
		
		 
	},
	
	showPendingActivities:function(id)
	{
		
		
		var activities = [ "SUMA POLINOMIOS", "RESTA FRACCIONES", "FACTORIZA P(X)"];
		var items = [];
		var day='1';
		var month= 0;
		$.each( activities, function( index, value )
		{
			 
			activityCode=Math.floor(Math.random()*1000);
			month=Role.months[Math.floor(Math.random()*10)];
			day='2'+Math.floor(Math.random()*10);
			
			items.push( '<li id="activity-'
			+index+'" class="ui-state-default" style="display:block;text-align: center;"> <div style="display:flex;"><div style="flex:1; background-color:#e61a74;"><div style="font-size:25px;color:white;text-align: center">'+day+' </div> <div style="font-size:10px !important ;color:white;background-color:#e61a74;"> '+month+'</div></div><div class="activity" style="flex:4;" onclick=Role.showActivity('+index+')> '+ value
			+'</div>         </div> </div>   </li>');
			
			
		});
		
		$( "#sortable").html('');
		$( "#sortable").append(items.join( "" ));
		
		Role.topMenuStart();
		Role.bottomMenuActivitiesList();
		 
	},
	
	topMenuSubjects:function()
	{
		
	},
	
	bottomMenuSubjects:function()
	{
		
	},
	topMenuActivities:function()
	{
		
	},
	bottomMenuTeacherToBeCorrected:function()
	{
		$( "#bottomMenu").load('./menu/bottomMenuTeacherToBeCorrected.html');
	},
	bottomMenuActivitiesList:function()
	{
		$( "#bottomMenu").load('./menu/bottomMenuActivitiesList.html');
	},
	bottomMenuNewActivity:function()
	{
		$( "#bottomMenu").load('./menu/bottomMenuNewActivity.html');
	},
	
	topMenuActivity:function()
	{
		$( "#topMenu").load('./menu/topMenuActivity.html');
	},
	
	bottomMenuActivity:function()
	{
		$( "#bottomMenu").load('./menu/bottomMenuActivity.html');
	},
	topMenuStart:function()
	{
		$( "#topMenu").load('./menu/topMenuStart.html');
	},
	bottomMenuStart:function()
	{
		$( "#bottomMenu").load('./menu/bottomMenuStart.html');
	},
	bottomMenuStudentStart:function()
	{
		$( "#bottomMenu").load('./menu/bottomMenuStudentStart.html');
	},
	bottomMenuImage: function()
	{
		$( "#bottomMenu").load('./menu/bottomImage.html');
	
	}
	
	
};


Role.info();



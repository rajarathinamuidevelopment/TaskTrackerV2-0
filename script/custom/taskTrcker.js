/* 
Task Tracker v2.0 component 
Created By - Rajarathinam Maduram
Created On - 08/06/2016
Details: Task Tracker is an reusable components which deals with existing JSON data to show task in HTML. User can add data from the input element.
once submitted the data can reflect in the existing task table. 
Component Dependent: JQuery
*/

/*The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, 
without waiting for stylesheets, images, and subframes to finish loading*/
$( document ).ready(function() {
	// Reg expression for date should not be accepted if its in past it is hardcoded but need to be dynamic later.
	var regex = /^(0[0-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(201[6789])$/;
	// variable JSON object which holds intial set of data
	var json = '{"task":[{"name" : "Test Task #1","date" : "12/01/2012","assigned" : "John Doe"},{"name" : "Test Task #2","date" : "12/01/2012","assigned" : "John Doe"},{"name" : "Test Task #3","date" : "12/01/2012","assigned" : "John Doe"},{"name" : "Test Task #4","date" : "12/01/2012","assigned" : "John Doe"},{"name" : "Test Task #5","date" : "12/01/2012","assigned" : "John Doe"},{"name" : "Test Task #6","date" : "12/01/2012","assigned" : "John Doe"}]}'
	//creating an object to store JSON data
	var obj = $.parseJSON(json);
	//local storage data 
	var localJSON;
	/**
	 * On button submit validate the data by function validate and add data in the task  and rebuilt the existing task again.
	 * @param e - ket press event 
	 */
	$('[data-task] [data-submit]').on("click",function(e) {
	    if(validate()) {
	    	obj['task'].push({"name":$('[data-name]').val(),"date":$('[data-date]').val(),"assigned" : $('[data-assign]').val()});
			json = JSON.stringify(obj);
			sessionStorage.setItem("tasktrackerjson", json);
			buildExistingTask(json);					
	    }
	});
	/**
	 * Key press function for Date input in Task Tracker v2.0 should accept only number and slash(/) only
	 * @param e - ket press event 
	 */
	$('[data-task] [data-date]').on("keypress",function(e) {
	    var a = [];
	    var k = e.which;
	    for (i = 47; i < 58; i++)
	        a.push(i);
	    if (!(a.indexOf(k)>=0))
	        e.preventDefault();
	});
	/**
	 * Key press function for Date input in Task Tracker v2.0 should accept only number and slash(/) only
	 * @param e - ket press event 
	 */
	$('[data-task] [data-name],[data-task] [data-assign]').on("keypress",function(e) {
	    $(this).removeClass('alert');
	});
	/**
	 * Key Up function for Date input in Task Tracker v2.0 to validate date and not an past date
	 * @param e - ket press event 
	 */			
	$( "[data-task] [data-date]" ).on( "keyup", function(e) {
	  var str = $('[data-date]').val()
	  
	  if(!str.match(regex))
	  {
	  	$('[data-task] [data-date]').addClass('alert');
	  }
	  else
	  	$('[data-task] [data-date]').removeClass('alert');
	});
	 /**
	 * Validate input for empty data in Task and Assign, for date validate date by using Reg Expression
	 * @param empty
	 * @return {Boolean} flag
	 */	
	function validate(){
		var str = $('[data-date]').val();
		var flag = true;
		$('[data-task] [data-name],[data-task] [data-date],[data-task] [data-assign]').removeClass('alert')
	    if($('[data-name]').val()==''){
	    	$('[data-name]').addClass('alert');
	    	flag = false;
	    }
	    if(!str.match(regex))
		{
		  	$('[data-task] [data-date]').addClass('alert');
		  	flag = false;
		}
	    if($('[data-assign]').val()==''){
	    	$('[data-assign]').addClass('alert');
	    	flag = false;
	    }
	    return flag
	}
	/**
	 * Build list of existing task from JSON
	 * @param {JSON} json 
	 */		
	function buildExistingTask(json){
		json = $.parseJSON(json).task;
		$("[data-task] section div:last-child ul li").remove()
	    $.each(json, function(key, value){
	        $("[data-task] section div:last-child ul").append(
	        	'<li>'+
	        	'<div>'+value.name+'</div>'+
	        	'<div>'+value.date+'</div>'+
	        	'<div>'+value.assigned+'</div>'+
	        	'</li>');
	    });
	    $('[data-task] [data-name],[data-task] [data-date],[data-task] [data-assign]').val('')
	}
	//get JSON data fromlocal storage if not set default values.
	function getJSONdata(){
		//check wheather local JSON data available or not
		try {
	    	if(!sessionStorage.getItem("tasktrackerjson")){
	    		//set default value to local json
	        	sessionStorage.setItem("tasktrackerjson", JSON.stringify(obj));
	    	}
	    }
	    // Throw error when exceed data storage or erroe saving.
	    catch (e) {
	        if (e == QUOTA_EXCEEDED_ERR) {
	            console.log("Error: Local Storage limit exceeds.");
	        }
	        else {
	            console.log("Error: Saving to local storage.");
	        }
	    }
	    //get the localstorege JSON value to build the existing task tracker.
	    localJSON = JSON.parse(sessionStorage.getItem("tasktrackerjson"));

	    //call function buildExistingTask to build the existing task with json data variable
		buildExistingTask(JSON.stringify(localJSON));
	}
	//initiate Task Tracker 2.0 by calling below function
	getJSONdata()
});
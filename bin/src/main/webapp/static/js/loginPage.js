

	//window.onload = function(){
   //document.getElementById("submitButtonLogin").addEventListener("click", login);
    //fillProfileInfo();
	//login();
	//};


	function login(){
    
	//let e_mail = document.getElementById("emailLogin").value;
	//let passWord = document.getElementById("passwordLogin").value;
    
	let object = {
	
	email: "mclarke@gmail.com",
	password: "mclarke"
	
	}


	var myJSON = JSON.stringify(object);

    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function(){

    	console.log("response text: "+ xhr.responseText+
		" http status: "+ xhr.status + 
		" http status text: "+ xhr.statusText + 
		" readyState: "+ xhr.readyState
    	);
    	
    	if(xhr.readyState == 4 && xhr.status == 200){
    		
    		let obj = JSON.parse(xhr.responseText);
  
    		if(obj == null){
    			console.log("No users found!");
    			document.getElementById("wrongPassword").innerHTML = "Wrong Username/Password"
    		}
    		else if(obj.user_type == "User"){
    			let url = 'http://localhost:8080/project1Practice/html/employeeHomepage.html';
    			window.location = url;
    		}
    		else if(obj.user_type == "Manager"){
    			let url = 'http://localhost:8080/project1Practice/html/managerHomepage.html';
    			window.location = url;
    		}
           
        }
    	
    }

    xhr.open("POST", "http://localhost:8080/project1Practice/login");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(myJSON);
};

    
	

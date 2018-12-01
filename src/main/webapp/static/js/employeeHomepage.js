window.onload = function(){

	fillProfileInfo();
    fillAllReimbursementsTable();
	document.getElementById("updateUserProfileInfo").addEventListener("click", updateUserProfile);
	document.getElementById("updateUserPasswordInfo").addEventListener("click", updatePassword);
    document.getElementById("closeModal").addEventListener("click", clearProfileModal);
    document.getElementById("closeReimSubmit").addEventListener("click", clearReimModal);
    document.getElementById("closePassModal").addEventListener("click", clearPasswordModal);
    document.getElementById("logoutButton").addEventListener("click", logout);
	window.onscroll = function() { scrollFunction() };
	};
	
	function redirectHome(){
	    fillProfileInfo();
	    fillAllReimbursementsTable();
		};
	

	function fillProfileInfo(){
    
	    var xhr = new XMLHttpRequest();
	    
	    xhr.onreadystatechange = function(){
	
	    	if(xhr.readyState == 4 && xhr.status == 200){
	    		
	    		let obj = JSON.parse(xhr.responseText);
	    		console.log(obj);
	            let fname = document.getElementById("userFullName");
	            let email = document.getElementById("userEmail");
	            let ph = document.getElementById("userPhoneNumber");
	            let utype = document.getElementById("userType");
	            let wName = document.getElementById("welcomeName");
	            
	            wName.innerHTML = obj.firstName;
	            fname.innerHTML = obj.firstName + " " + obj.lastName;
	            email.innerHTML = obj.email;
	            ph.innerHTML = obj.phone_number;
	            utype.innerHTML = obj.user_type;
	           
	            document.getElementById("firstnameUpdate").value = obj.firstName;
	    	    document.getElementById("lastnameUpdate").value = obj.lastName;
	    	    document.getElementById("emailUpdate").value = obj.email;
	    	    document.getElementById("phoneUpdate").value = obj.phone_number;
	           
	        }
	    	
	    }

	    xhr.open("POST", "http://localhost:8080/FrontController/fillUserProfileInfo");
	    xhr.setRequestHeader("Content-Type", "application/json");
	    xhr.send();
	};
	
		/**
		 * FILL ALL REIM TABLE
		 * @returns
		 */
		function fillAllReimbursementsTable(){
			let uId = 4;

		    var xhr = new XMLHttpRequest();
		    
		    xhr.onreadystatechange = function(){
		
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		
		    		let obj = JSON.parse(xhr.responseText);
		    		
		    		for (var i = 0, l = obj.length; i < l; i++) {
		    			
		    		    var obj1 = obj[i];
		    		    
		    		    if(obj1.r_status == "Approved"){
		    		    	addToAllTable(obj1);
		    		    }
		    		    else if(obj1.r_status == "Denied"){
		    		    	addToResolvedTable(obj1);
		    		    }
		    		    else if(obj1.r_status == "Pending"){
		    		    	addToPendingTable(obj1);
		    		    }
		    		
		    		}
		            
		        }
		    	
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/fillAllReimTableEmployee");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send();
		}
		
		function addToAllTable(obj1){
			console.log(obj1);
			let reim_id = obj1.r_id;
			let date_submitted = obj1.date_submitted;
			let date_resolved = obj1.date_resolved;
			let amount = obj1.r_amount;
			let status = obj1.r_status;
		
		
			let row = document.createElement("tr");
			let idCol = document.createElement("td");
			let dateCol = document.createElement("td");
			let dateRCol = document.createElement("td");
			let amountCol = document.createElement("td");
			let statusCol = document.createElement("td");
		
			idCol.textContent = reim_id;
			dateCol.textContent = date_submitted;
			dateRCol.textContent = date_resolved;
			amountCol.textContent = amount;
			statusCol.textContent = status;
		
			row.appendChild(idCol);
			row.appendChild(dateCol);
			row.appendChild(dateRCol);
			row.appendChild(amountCol);
			row.appendChild(statusCol);
		
		document.getElementById("myTableAll").appendChild(row);
		}
		
		function addToResolvedTable(obj1){
			let reim_id = obj1.r_id;
			let date_submitted = obj1.date_submitted;
			let date_resolved = obj1.date_resolved;
			let amount = obj1.r_amount;
			let status = obj1.r_status;
			
		
			let row = document.createElement("tr");
			let idCol = document.createElement("td");
			let dateCol = document.createElement("td");
			let dateRCol = document.createElement("td");
			let amountCol = document.createElement("td");
			let statusCol = document.createElement("td");
		
			idCol.textContent = reim_id;
			dateCol.textContent = date_submitted;
			dateRCol.textContent = date_resolved;
			amountCol.textContent = amount;
			statusCol.textContent = status;
		
			row.appendChild(idCol);
			row.appendChild(dateCol);
			row.appendChild(dateRCol);
			row.appendChild(amountCol);
			row.appendChild(statusCol);
		
		document.getElementById("myTableResolved").appendChild(row);
		}
		
		function addToPendingTable(obj1){
			let reim_id = obj1.r_id;
			let date_submitted = obj1.date_submitted;
			let type = obj1.r_type;
			let amount = obj1.r_amount;
			let status = obj1.r_status;
		
		
			let row = document.createElement("tr");
			let idCol = document.createElement("td");
			let dateCol = document.createElement("td");
			let typeCol = document.createElement("td");
			let amountCol = document.createElement("td");
			let statusCol = document.createElement("td");
		
			idCol.textContent = reim_id;
			dateCol.textContent = date_submitted;
			typeCol.textContent = type;
			amountCol.textContent = amount;
			statusCol.textContent = status;
		
			row.appendChild(idCol);
			row.appendChild(dateCol);
			row.appendChild(typeCol);
			row.appendChild(amountCol);
			row.appendChild(statusCol);
		
		document.getElementById("myTablePending").appendChild(row);
		}
		
		function updateUserProfile(){
			
			let fnameUpdate = document.getElementById("firstnameUpdate").value;
    	    let lnameUpdate = document.getElementById("lastnameUpdate").value;
    	    let eUpdate = document.getElementById("emailUpdate").value;
    	    let phUpdate = document.getElementById("phoneUpdate").value;
    	 
    	    if(fnameUpdate == "" || lnameUpdate == "" || eUpdate == "" || phUpdate == ""){
    	    	document.getElementById("valueWarning").innerHTML = "Please enter all the fields!";
    	    	document.getElementById("emailAlreadyExists").innerHTML = "";
    	    }
    	    else{
    	    
    	    let object = {
    	    		firstName: fnameUpdate,
    	    		lastName: lnameUpdate,
    	    		email: eUpdate,
    	    		phone_number: phUpdate
    	   }
    	    
    	    console.log(object);
    	    var myJSON = JSON.stringify(object);

		    var xhr = new XMLHttpRequest();
		    
		    xhr.onreadystatechange = function(){
		
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		console.log(xhr.responseText);
		    		if(xhr.responseText == "false"){
		    			document.getElementById("emailAlreadyExists").innerHTML = "E-Mail already Exist!  Please choose another one.";
		    			document.getElementById("valueWarning").innerHTML = "";
		    		}
		    		else{
		    			$('#updateProfileModal').modal('hide');
		    			var Approved  = document.getElementById("myTableAll");
		    			clearTable(Approved);
		    			var Denied  = document.getElementById("myTableResolved");
		    			clearTable(Denied);
		    			var Pending  = document.getElementById("myTablePending");
		    			clearTable(Pending);
		    			redirectHome();
		    			clearProfileModal();
		    		}
		    		}
		            
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/updateUserProfile");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send(myJSON);
    	    }
		}
		
		
		function updatePassword(){
			let currPass = document.getElementById("existingPass").value;
			let newPass = document.getElementById("newPass").value;
    	    
			if(currPass == "" || newPass == ""){
				document.getElementById("passNotEntered").innerHTML = "Please enter all the fields!"
				document.getElementById("wrongCurrPass").innerHTML = "";
			}
			else{
    	 
    	    let object = {
    	    		firstName: currPass,
    	    		password: newPass
    	   }
    	    
    	    console.log(object);
    	    var myJSON = JSON.stringify(object);

		    var xhr = new XMLHttpRequest();
		    
		    xhr.onreadystatechange = function(){
		
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		console.log(xhr.responseText);
		    		if(xhr.responseText == "false"){
		    			document.getElementById("wrongCurrPass").innerHTML = "Wrong Current Password";
		    			document.getElementById("passNotEntered").innerHTML = "";
		    		}
		    		else{
		    			$('#updatePasswordModal').modal('hide');
		    			var Approved  = document.getElementById("myTableAll");
		    			clearTable(Approved);
		    			var Denied  = document.getElementById("myTableResolved");
		    			clearTable(Denied);
		    			var Pending  = document.getElementById("myTablePending");
		    			clearTable(Pending);
		    			redirectHome();
		    			clearPasswordModal();
		    		}
		    		}
		            
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/updateUserPass");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send(myJSON);
		}
		}
		
		function scrollFunction() {
		    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		        document.getElementById("myBtn").style.display = "block";
		    } else {
		        document.getElementById("myBtn").style.display = "none";
		    }
		}
		
		function clearPasswordModal(){
			document.getElementById("existingPass").value="";
			document.getElementById("newPass").value="";
			document.getElementById("passNotEntered").innerHTML = "";
			document.getElementById("wrongCurrPass").innerHTML = "";
		}
		
		function clearProfileModal(){
    	    document.getElementById("valueWarning").innerHTML = "";
			document.getElementById("emailAlreadyExists").innerHTML = "";
			var Approved  = document.getElementById("myTableAll");
			clearTable(Approved);
			var Denied  = document.getElementById("myTableResolved");
			clearTable(Denied);
			var Pending  = document.getElementById("myTablePending");
			clearTable(Pending);
		}
		
		function clearReimModal(){
			document.getElementById("reimbursementAmount").value = "";
			document.getElementById("reimbursementDescription").value = "";
		}
		
		function clearTable(table) {
			while(table.rows.length > 0){
		        table.deleteRow(0);
		    }
			}

		
		function topFunction() {
		    document.body.scrollTop = 0;
		    document.documentElement.scrollTop = 0;
		}
		
		
		function logout(){
			var xhr = new XMLHttpRequest();
		    
		    xhr.onreadystatechange = function(){
		
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		window.location = "http://localhost:8080/FrontController/static/index.html";
		    		}
		            }

		    xhr.open("POST", "http://localhost:8080/FrontController/logoutAccount");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send();
		}
	
	
	

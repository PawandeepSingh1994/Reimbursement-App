	
window.onload = function(){
		
    fillProfileInfo();
    fillAllUsers();
    fillAllReimbursementsTable();
    document.getElementById("updateUserProfileInfo").addEventListener("click", updateManagerProfile);
	document.getElementById("updateUserPasswordInfo").addEventListener("click", updatePassword);
    document.getElementById("closeModal").addEventListener("click", clearProfileModal);
    document.getElementById("closePassModal").addEventListener("click", clearPasswordModal);
    document.getElementById("closeReimSubmit").addEventListener("click", clearReimModal);
    document.getElementById("searchReimButton").addEventListener("click", searchForReimbursement);
    document.getElementById("userSearchClose").addEventListener("click", clearUserSearchModal);
    document.getElementById("searchReimClose").addEventListener("click", clearSearchReimModal);
    document.getElementById("searchUserButton").addEventListener("click", searchForUser);
    document.getElementById("addNewUserButton").addEventListener("click", addNewUser);
    document.getElementById("addUserModalClose").addEventListener("click", clearNewUserModal);
	document.getElementById("logoutButton").addEventListener("click", logout);
    
    window.onscroll = function() { scrollFunction() };
	};
	
	function redirectHome(){
	    fillProfileInfo();
	    fillAllReimbursementsTable(); 
	    fillAllUsers();
	};
	
	function fillProfileInfo(){

	    var xhr = new XMLHttpRequest();
	    
	    xhr.onreadystatechange = function(){
	
	    	console.log("response text: "+ xhr.responseText+
			" http status: "+ xhr.status + 
			" http status text: "+ xhr.statusText + 
			" readyState: "+ xhr.readyState
	    	);
	    	
	    	if(xhr.readyState == 4 && xhr.status == 200){
	    		
	    		let obj = JSON.parse(xhr.responseText);
	    		
	            let fname = document.getElementById("userFullName");
	            let email = document.getElementById("userEmail");
	            let pass = document.getElementById("userPhoneNumber");
	            let utype = document.getElementById("userType");
	            let welcomeName = document.getElementById("welcomeName");
	            
	            welcomeName.innerHTML = obj.firstName;
	            fname.innerHTML = obj.firstName + " " + obj.lastName;
	            email.innerHTML = obj.email;
	            pass.innerHTML = obj.phone_number;
	            utype.innerHTML = obj.user_type;
	            
	            document.getElementById("firstnameUpdate").value = obj.firstName;
	    	    document.getElementById("lastnameUpdate").value = obj.lastName;
	    	    document.getElementById("emailUpdate").value = obj.email;
	    	    document.getElementById("phoneUpdate").value = obj.phone_number;
	         }
	    	
	    }

	    xhr.open("POST", "http://localhost:8080/FrontController/fillManagerProfileInfo");
	    xhr.setRequestHeader("Content-Type", "application/json");
	    xhr.send();
	};
	
		/**
		 * FILL ALL REIM TABLE
		 * @returns
		 */
		function fillAllReimbursementsTable(){
			
		    var xhr = new XMLHttpRequest();
		    
		    xhr.onreadystatechange = function(){
		
		    	console.log("response text: "+ xhr.responseText+
				" http status: "+ xhr.status + 
				" http status text: "+ xhr.statusText + 
				" readyState: "+ xhr.readyState
		    	);
		    	
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		
		    		let obj = JSON.parse(xhr.responseText);
		    		console.log(obj);
		    		for (var i = 0, l = obj.length; i < l; i++) {
		    		    var obj1 = obj[i];

		    		    if(obj1.r_status == "Approved"){
		    		    	addToApprovedTable(obj1);
		    		    }
		    		    else if(obj1.r_status == "Denied"){
		    		    	addToDeniedTable(obj1);
		    		    }
		    		    else if(obj1.r_status == "Pending"){
		    		    	addToPendingTable(obj1);
		    		    }
		    		    
		    		}
		            
		        }
		    	
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/fillAllReimsManager");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send();
		}
		
		function addToApprovedTable(obj1){
			
			let reim_id = obj1.r_id;
			let name = obj1.r_emp_name;
			let date_submitted = obj1.date_submitted;
			let date_resolved = obj1.date_resolved;
			let amount = obj1.r_amount;
			let manager = obj1.r_man_name;
			let status = obj1.r_status;
		
		
			let row = document.createElement("tr");
			let idCol = document.createElement("td");
			let nameCol = document.createElement("td");
			let dateCol = document.createElement("td");
			let dateRCol = document.createElement("td");
			let amountCol = document.createElement("td");
			let manCol = document.createElement("td");
			let statusCol = document.createElement("td");
		
			idCol.textContent = reim_id;
			nameCol.textContent = name;
			dateCol.textContent = date_submitted;
			dateRCol.textContent = date_resolved;
			amountCol.textContent = amount;
			manCol.textContent = manager;
			statusCol.textContent = status;
		
			row.appendChild(idCol);
			row.appendChild(nameCol);
			row.appendChild(dateCol);
			row.appendChild(dateRCol);
			row.appendChild(amountCol);
			row.appendChild(manCol);
			row.appendChild(statusCol);
		
		document.getElementById("myTableAll").appendChild(row);
		}
		
		
		function addToDeniedTable(obj1){
			let reim_id = obj1.r_id;
			let name = obj1.r_emp_name;
			let date_submitted = obj1.date_submitted;
			let date_resolved = obj1.date_resolved;
			let amount = obj1.r_amount;
			let manager = obj1.r_man_name;
			let status = obj1.r_status;
		
		
			let row = document.createElement("tr");
			let idCol = document.createElement("td");
			let nameCol = document.createElement("td");
			let dateCol = document.createElement("td");
			let dateRCol = document.createElement("td");
			let amountCol = document.createElement("td");
			let manCol = document.createElement("td");
			let statusCol = document.createElement("td");
		
			idCol.textContent = reim_id;
			nameCol.textContent = name;
			dateCol.textContent = date_submitted;
			dateRCol.textContent = date_resolved;
			amountCol.textContent = amount;
			manCol.textContent = manager;
			statusCol.textContent = status;
		
			row.appendChild(idCol);
			row.appendChild(nameCol);
			row.appendChild(dateCol);
			row.appendChild(dateRCol);
			row.appendChild(amountCol);
			row.appendChild(manCol);
			row.appendChild(statusCol);
		
		document.getElementById("myTableResolved").appendChild(row);
		}
		
		
		function addToPendingTable(obj1){
			
			let id = obj1.r_id;
			let name = obj1.r_emp_name;
			let dateS = obj1.date_submitted;
			let amount = obj1.r_amount;
			let status = obj1.r_status;
			
			
			let row = document.createElement("tr");
			
			let idCol = document.createElement("td");
			let nameCol = document.createElement("td");
			let dateSCol = document.createElement("td");
			let amountCol = document.createElement("td");
			let statusCol = document.createElement("td");
			
		
			idCol.textContent = id;
			nameCol.textContent = name;
			dateSCol.textContent = dateS;
			amountCol.textContent = amount;
			statusCol.textContent = status; 
			
		
			row.appendChild(idCol);
			row.appendChild(nameCol);
			row.appendChild(dateSCol);
			row.appendChild(amountCol);
			row.appendChild(statusCol);
			
		
		document.getElementById("myTablePending").appendChild(row);
		}
		
		function fillAllUsers(){
			
		    var xhr = new XMLHttpRequest();
		    
		    xhr.onreadystatechange = function(){
		
		    	console.log("response text: "+ xhr.responseText+
				" http status: "+ xhr.status + 
				" http status text: "+ xhr.statusText + 
				" readyState: "+ xhr.readyState
		    	);
		    	
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		
		    		let obj = JSON.parse(xhr.responseText);
		    		console.log(obj);
		    		for (var i = 0, l = obj.length; i < l; i++) {
		    		    var obj1 = obj[i];
		    		    addUsersToList(obj1);
		    		}
		    	}
		    	};

		    xhr.open("POST", "http://localhost:8080/FrontController/fillallusers");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send();
			};
			
			/**
			 * ADD USERS TO LIST
			 * @param obj1
			 * @returns
			 */
			function addUsersToList(obj1){
				console.log(obj1);
				let first_Name = obj1.firstName;
				let last_Name = obj1.lastName;
				let user_e_mail = obj1.email;
				let userPhone = obj1.phone_number;
				let userType = obj1.user_type;
				
				
				let row = document.createElement("tr");
				let fnameCol = document.createElement("td");
				let lnameCol = document.createElement("td");
				let emailCol = document.createElement("td");
				let userPh = document.createElement("td");
				let typeOfUser = document.createElement("td");
				
				fnameCol.textContent = first_Name;
				lnameCol.textContent = last_Name;
				emailCol.textContent = user_e_mail;
				userPh.textContent = userPhone;
				typeOfUser.textContent = userType;
				
				row.appendChild(fnameCol);
				row.appendChild(lnameCol);
				row.appendChild(emailCol);
				row.appendChild(userPh);
				row.appendChild(typeOfUser);
				
				document.getElementById("myTableAllUsers").appendChild(row);
			}
		
		
		function updateManagerProfile(){
			
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
		    			var users  = document.getElementById("myTableAllUsers");
		    			clearTable(users);
		    			redirectHome();
		    			clearProfileModal();
		    		}
		    		}
		            
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/updateManagerProfile");
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
		    			var users  = document.getElementById("myTableAllUsers");
		    			clearTable(users);
		    			redirectHome();
		    			clearPasswordModal();
		    		}
		    		}
		            
		    }
 
		    xhr.open("POST", "http://localhost:8080/FrontController/updateManagerPass");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send(myJSON);
			}
		}
		
		/**
		 * 
		 */
		function addNewUser(){
			
			let fnameNew = document.getElementById("newUserFname").value;
    	    let lnameNew = document.getElementById("newUserLname").value;
    	    let eNew = document.getElementById("newUserEmail").value;
    	    let passNew = document.getElementById("newUserPassword").value;
    	    let phNew = document.getElementById("newUserPhone").value;
    	    let typeNew = document.getElementById("newUserType").value;
    	    
    	    if(fnameNew == "" || lnameNew == "" || eNew == "" || passNew == "" || phNew == "" || typeNew == "" || typeNew == "Choose..."){
    	    	document.getElementById("valueWarningNew").innerHTML = "Please enter all the fields!";
    	    	document.getElementById("emailAlreadyExistsNew").innerHTML = "";
    	    }
    	    else{
    	    let object = {
    	    		firstName: fnameNew,
    	    		lastName: lnameNew,
    	    		email: eNew,
    	    		password: passNew,
    	    		phone_number: phNew,
    	    		user_type: typeNew
    	   }
    	    
    	    console.log(object);
    	    var myJSON = JSON.stringify(object);

		    var xhr = new XMLHttpRequest();
		    
		    xhr.onreadystatechange = function(){
		
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		console.log(xhr.responseText);
		    		if(xhr.responseText == "false"){
		    			document.getElementById("emailAlreadyExistsNew").innerHTML = "E-Mail already Exist!  Please choose another one.";
		    			document.getElementById("valueWarningNew").innerHTML = "";
		    		}
		    		else{
		    			$('#addNewUserModal').modal('hide');
		    			var Approved  = document.getElementById("myTableAllUsers");
		    			clearTable(Approved);
		    			var Denied  = document.getElementById("myTableResolved");
		    			clearTable(Denied);
		    			var Pending  = document.getElementById("myTablePending");
		    			clearTable(Pending);
		    			var users  = document.getElementById("myTableAllUsers");
		    			clearTable(users);
		    			redirectHome();
		    			clearNewUserModal();
		    		}
		    		}
		            
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/addNewUser");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send(myJSON);
    	    }
		}
		
		/**
		 * SEARCH FOR REIMBURSEMENT
		 * @returns
		 */
		function searchForReimbursement(){
			let rId = document.getElementById("reimID").value;
			
			let object = {
					r_id: rId
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
    	    		if(xhr.responseText == "null"){
    	    		
    	    			document.getElementById("employeeFullNameDisplayReim").innerHTML = "";
        	    		document.getElementById("employeeStatusReim").innerHTML = "";
        	    		document.getElementById("dateSub").innerHTML = "";
        	    		document.getElementById("dateRes").innerHTML = "";
        	    		document.getElementById("reimbursementTypeDisplayReim").innerHTML = "";
        	    		document.getElementById("reimbursementDescriptionDisplayReim").innerHTML = "";
        	    		document.getElementById("resolvingManagerDisplayReim").innerHTML = "";
    	    			document.getElementById("noResultFoundReim").innerHTML = "No Results Found!"
    	    		}
    	    		else{
    	    		let obj = JSON.parse(xhr.responseText);
    	    		console.log(obj);
    	    		document.getElementById("noResultFoundReim").innerHTML = "";
    	    		document.getElementById("employeeFullNameDisplayReim").innerHTML = obj.r_emp_name;
    	    		document.getElementById("dateSub").innerHTML = obj.date_submitted;
    	    		if(obj.date_resolved == null){
    	    			document.getElementById("dateRes").innerHTML = "Not Yet Resolved!";
    	    			} 
    	    		else{
    	    			document.getElementById("dateRes").innerHTML = obj.date_resolved;
    	    			}
    	    		document.getElementById("employeeFullNameDisplayReim").innerHTML = obj.r_emp_name;
    	    		document.getElementById("employeeStatusReim").innerHTML = obj.r_status;
    	    		document.getElementById("reimbursementTypeDisplayReim").innerHTML = obj.r_type;
    	    		if(obj.r_description == null){
    	    		document.getElementById("reimbursementDescriptionDisplayReim").innerHTML = "No Description";
    	    		}
    	    		else{
    	    			document.getElementById("reimbursementDescriptionDisplayReim").innerHTML = obj.r_description;
    	    		}
    	    		let man_name;
    	    		if(obj.r_man_name == "null null"){
    	    			man_name = "Not yet Resolved!"
    	    		}
    	    		else{
    	    			man_name = obj.r_man_name;
    	    		}
    	    		document.getElementById("resolvingManagerDisplayReim").innerHTML = man_name;
    	    		}
    	    		
    	    	}
    	    }
    
    	    xhr.open("post", "http://localhost:8080/FrontController/searchReim");
    	    xhr.setRequestHeader("Content-Type", "application/json");
    	    xhr.send(myJSON);
			
		};
		
		/**
		 * SEARCH FOR USER
		 * @returns
		 */
		function searchForUser(){
			let fname = document.getElementById("firstnameUserSearch").value;
			let lname = document.getElementById("lastnameUserSearch").value;
			
			let object = {
					firstName: fname,
					lastName: lname
			}
			console.log(object);
			var myJSON = JSON.stringify(object);
    	    
    	    var xhr = new XMLHttpRequest();
   
    	    xhr.onreadystatechange = function(){
    	
    	    	console.log("response text: "+ xhr.responseText+
				" http status: "+ xhr.status + 
				" http status text: "+ xhr.statusText + 
				" readyState: "+ xhr.readyState
    	    	);
    	    	
    	    	if(xhr.readyState == 4 && xhr.status == 200){
    	    		if(xhr.responseText == "null"){
    	    			
    	    			document.getElementById("noResultsFound").innerHTML = "No Results Found!!"
    	    			var table  = document.getElementById("userSearchHeaderTable");
    	    			clearTable(table);
    	    		}
    	    		else{
    	    			document.getElementById("noResultsFound").innerHTML = ""
    	    			var table  = document.getElementById("userSearchHeaderTable");
    	    			clearTable(table);
    	    			let obj = JSON.parse(xhr.responseText);
    		    		console.log(obj);
    		    		for (var i = 0, l = obj.length; i < l; i++) {
    		    		    var obj1 = obj[i];
    		    		    addReimToList(obj1);
    		    		}
    	    		}
    	    	}
    	    }
    
    	    xhr.open("post", "http://localhost:8080/FrontController/searchForUser");
    	    xhr.setRequestHeader("Content-Type", "application/json");
    	    xhr.send(myJSON);
			
		};
		
		
		/**
		 * ADD REIMBURSEMENT TO LIST
		 * @param obj1
		 * @returns
		 */
		function addReimToList(obj1){
			console.log(obj1);
			let reim_id = obj1.r_id;
			let reim_amount = obj1.r_amount;
			let man_name;
			if(obj1.r_man_name == "null null"){
			man_name = "Not yet Resolved!";
			}
			else{
				man_name = obj1.r_man_name;
			}
			
			let row = document.createElement("tr");
			let reimIdCol = document.createElement("td");
			let amountCol = document.createElement("td");
			let manCol = document.createElement("td");
			
			reimIdCol.textContent = reim_id;
			amountCol.textContent = reim_amount;
			manCol.textContent = man_name;
			
			row.appendChild(reimIdCol);
			row.appendChild(amountCol);
			row.appendChild(manCol);
			
			document.getElementById("userSearchHeaderTable").appendChild(row);
		}
		
		function clearPasswordModal(){
			document.getElementById("existingPass").value="";
			document.getElementById("newPass").value="";
			document.getElementById("passNotEntered").innerHTML = "";
			document.getElementById("wrongCurrPass").innerHTML = "";
		}
		
		function clearProfileModal(){
			fillProfileInfo();
    	    document.getElementById("valueWarning").innerHTML = "";
			document.getElementById("emailAlreadyExists").innerHTML = "";
		}
		
		function clearTable(table) {
			while(table.rows.length > 0){
		        table.deleteRow(0);
		    }
			}
		
		function clearReimModal(){
			document.getElementById("reimbursementNum").value = "";
		}
		
		function clearSearchReimModal(){
			document.getElementById("reimID").value = "";
			document.getElementById("employeeFullNameDisplayReim").innerHTML = "";
    		document.getElementById("employeeStatusReim").innerHTML = "";
    		document.getElementById("dateSub").innerHTML = "";
    		document.getElementById("dateRes").innerHTML = "";
    		document.getElementById("reimbursementTypeDisplayReim").innerHTML = "";
    		document.getElementById("reimbursementDescriptionDisplayReim").innerHTML = "";
    		document.getElementById("resolvingManagerDisplayReim").innerHTML = "";
			document.getElementById("noResultFoundReim").innerHTML = "";
		}
		
		function clearUserSearchModal(){
			document.getElementById("firstnameUserSearch").value = "";
			document.getElementById("lastnameUserSearch").value = "";
			let table1 = document.getElementById("userSearchHeaderTable");
			clearTable(table1);
			
		}
		
		function clearNewUserModal(){
			document.getElementById("newUserFname").value = "";
    	    document.getElementById("newUserLname").value = "";
    	    document.getElementById("newUserEmail").value = "";
    	    document.getElementById("newUserPassword").value = "";
    	    document.getElementById("newUserPhone").value = "";
    	    document.getElementById("newUserType").value = "";
    	    document.getElementById("valueWarningNew").innerHTML = "";
			document.getElementById("emailAlreadyExistsNew").innerHTML = "";
		}
		
		function scrollFunction() {
		    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		        document.getElementById("myBtn").style.display = "block";
		    } else {
		        document.getElementById("myBtn").style.display = "none";
		    }
		}
		
		function topFunction() {
		    document.body.scrollTop = 0;
		    document.documentElement.scrollTop = 0;
		}
		
		function logout(){
			
			var xhr = new XMLHttpRequest();
		    
		    xhr.onreadystatechange = function(){
		
		    	console.log("response text: "+ xhr.responseText+
				" http status: "+ xhr.status + 
				" http status text: "+ xhr.statusText + 
				" readyState: "+ xhr.readyState
		    	);
		    	
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		window.location = "http://localhost:8080/FrontController/static/index.html";
		    		}
		            }

		    xhr.open("POST", "http://localhost:8080/FrontController/logoutAccount");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send();
		}
		
		
	
		
	

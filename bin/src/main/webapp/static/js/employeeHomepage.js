	window.onload = function(){
	
	document.getElementById("submitForReimbursement").addEventListener("click", addReimbursement);
	document.getElementById("updateUserProfileInfo").addEventListener("click", updateUserProfile);
    fillProfileInfo();
    fillAllReimbursementsTable();
    fillResolvedReimbursementTable();
    fillPendingReimbursementTable();
    document.getElementById("logoutUser").onchange = function(){ logout };
	};

	
	function addReimbursement(){

    	    let reimbursementType = document.getElementById("reimbTypeSelect").value;
    	    let description = document.getElementById("reimbursementDescription").value;
    	    let reimbursementAmount = document.getElementById("reimbursementAmount").value;
    	 
    	    let object = {
    	    		r_type: reimbursementType,
    	    		r_description: description,
    	    		r_amount: reimbursementAmount
    	     }
    	    
    	    var myJSON = JSON.stringify(object);
    	    
    	    var xhr = new XMLHttpRequest();
    
    	    xhr.onreadystatechange = function(){
    	
    	    	console.log("response text: "+ //xhr.responseText+
				" http status: "+ xhr.status + 
				" http status text: "+ xhr.statusText + 
				" readyState: "+ xhr.readyState
    	    	);
    	    	
    	    	if(xhr.readyState == 4 && xhr.status == 200){
    	    		
    	    		let obj = JSON.parse(xhr.responseText);
    	    		appendToAllReims(obj);
    	    		appendToPendingReims(obj);
    	    		
    	           
    	        }
    	    }
    
    	    xhr.open("post", "http://localhost:8080/FrontController/submitNewReimbursement");
    	    xhr.setRequestHeader("Content-Type", "application/json");
    	    xhr.send(myJSON);
    }

		/**
		 * 
		 * @returns
		 */
		function appendToAllReims(obj){
			let reim_id = obj.r_id;
			let date_submitted = obj.date_submitted;
			let type = obj.r_type;
			let amount = obj.r_amount;
			let status = obj.r_status;
		
		
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
		
		document.getElementById("myTableAll").appendChild(row);
		}
		
		/**
		 * 
		 * @returns
		 */
		function appendToPendingReims(obj){
			let reim_id = obj.r_id;
			let date_submitted = obj.date_submitted;
			let type = obj.r_type;
			let amount = obj.r_amount;
			let status = obj.r_status;
		
		
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
	
	function fillProfileInfo(){
    
		let e_mail = 'sunnyg@gmail.com';
		let passWord = 'sunnyg';
	    
		

	    var xhr = new XMLHttpRequest();
	    
	    xhr.onreadystatechange = function(){
	
	    	console.log("response text: "+ //xhr.responseText+
			" http status: "+ xhr.status + 
			" http status text: "+ xhr.statusText + 
			" readyState: "+ xhr.readyState
	    	);
	    	
	    	if(xhr.readyState == 4 && xhr.status == 200){
	    		
	    		let obj = JSON.parse(xhr.responseText);
	    		
	            let fname = document.getElementById("userFullName");
	            let email = document.getElementById("userEmail");
	            let pass = document.getElementById("userPassword");
	            let utype = document.getElementById("userType");
	            let totalreim = document.getElementById("totalReimbursements");  
	            let pendingreim = document.getElementById("pendingReimbursements");

	            fname.innerHTML = obj.firstName + " " + obj.lastName;
	            email.innerHTML = obj.email;
	            pass.innerHTML = obj.password;
	            utype.innerHTML = obj.user_type;
	            //totalreim.innerHTML = 0;
	            //pendingreim.innerHTML = 0;
	           
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
		
		    	console.log("response text: "+ //xhr.responseText+
				" http status: "+ xhr.status + 
				" http status text: "+ xhr.statusText + 
				" readyState: "+ xhr.readyState
		    	);
		    	
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		
		    		let obj = JSON.parse(xhr.responseText);
		    		//console.log(obj);
		    		for (var i = 0, l = obj.length; i < l; i++) {
		    		    var obj1 = obj[i];
		    		    addToAllTable(obj1);
		    		}
		            
		        }
		    	
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/fillAllReimTableEmployee");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send();
		}
		
		function addToAllTable(obj1){
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
		
		document.getElementById("myTableAll").appendChild(row);
		}
		
		/**
		 * FILL RESOLVED REIMS
		 */
		function fillResolvedReimbursementTable(){
			let uId = 4;
		    
			let object = {
			
			user_id: uId
			
			}
	
			var myJSON = JSON.stringify(object);

		    var xhr = new XMLHttpRequest();
		    
		    xhr.onreadystatechange = function(){
		
		    	console.log("response text: "+ //xhr.responseText+
				" http status: "+ xhr.status + 
				" http status text: "+ xhr.statusText + 
				" readyState: "+ xhr.readyState
		    	);
		    	
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		
		    		let obj = JSON.parse(xhr.responseText);
		    		console.log(obj);
		    		for (var i = 0, l = obj.length; i < l; i++) {
		    		    var obj1 = obj[i];
		    		    addToResolvedTable(obj1);
		    		}
		            
		        }
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/fillResolvedReimTableEmployee");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send(myJSON);
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
		
		/**
		 * FILL RESOLVED REIMS
		 */
		function fillPendingReimbursementTable(){
			let uId = 4;
		    
			let object = {
			
			user_id: uId
			
			}
	
			var myJSON = JSON.stringify(object);

		    var xhr = new XMLHttpRequest();
		    
		    xhr.onreadystatechange = function(){
		
		    	console.log("response text: "+ //xhr.responseText+
				" http status: "+ xhr.status + 
				" http status text: "+ xhr.statusText + 
				" readyState: "+ xhr.readyState
		    	);
		    	
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		
		    		let obj = JSON.parse(xhr.responseText);
		    		//console.log(obj);
		    		for (var i = 0, l = obj.length; i < l; i++) {
		    		    var obj1 = obj[i];
		    		    addToPendingTable(obj1);
		    		}
		            
		        }
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/fillPendingReimTableEmployee");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send(myJSON);
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
	    	    let passUpdate = document.getElementById("passwordUpdate").value;
	    	 
	    	    let object = {
	    	    		firstName: fnameUpdate,
	    	    		lastName: lnameUpdate,
	    	    		email: eUpdate,
	    	    		password: passUpdate
	    	   }
	    	    
	    	    var myJSON = JSON.stringify(object);

			    var xhr = new XMLHttpRequest();
			    
			    xhr.onreadystatechange = function(){
			
			    	console.log("response text: "+ //xhr.responseText+
					" http status: "+ xhr.status + 
					" http status text: "+ xhr.statusText + 
					" readyState: "+ xhr.readyState
			    	);
			    	
			    	if(xhr.readyState == 4 && xhr.status == 200){
			    		
			    		let obj = JSON.parse(xhr.responseText);
			    		//console.log(obj);
			    		
			    		}
			            
			    }

			    xhr.open("POST", "http://localhost:8080/FrontController/updateUserProfile");
			    xhr.setRequestHeader("Content-Type", "application/json");
			    xhr.send(myJSON);
			
		}
		
		
		function logout(){
			console.log("HELOOOOOOOOOOOOOOOOO");
			console.log("HELOOOOOOOOOOOOOOOOO");
			console.log("HELOOOOOOOOOOOOOOOOO");
			console.log("HELOOOOOOOOOOOOOOOOO");
			console.log("HELOOOOOOOOOOOOOOOOO");
			console.log("HELOOOOOOOOOOOOOOOOO");
			console.log("HELOOOOOOOOOOOOOOOOO");
			console.log("HELOOOOOOOOOOOOOOOOO");
			console.log("HELOOOOOOOOOOOOOOOOO");
			console.log("HELOOOOOOOOOOOOOOOOO");
			var xhr = new XMLHttpRequest();
		    
		    xhr.onreadystatechange = function(){
		
		    	console.log("response text: "+ //xhr.responseText+
				" http status: "+ xhr.status + 
				" http status text: "+ xhr.statusText + 
				" readyState: "+ xhr.readyState
		    	);
		    	
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		
		    		}
		            }

		    xhr.open("POST", "http://localhost:8080/FrontController/logout");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send();
		}
	
	
	

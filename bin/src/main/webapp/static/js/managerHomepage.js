	window.onload = function(){
	
	document.getElementById("submitForReimbursement").addEventListener("click", resolveReimbursement);
	document.getElementById("updateUserProfileInfo").addEventListener("click", updateManagerProfile);
    fillProfileInfo();
    fillAllReimbursementsTable();
    fillResolvedReimbursementTable();
    fillPendingReimbursementTable();
   // document.getElementById("logoutUser").onchange = function(){ logout };
	};

	
	function resolveReimbursement(){

    	    let reimbursementId = document.getElementById("reimbursementNum").value;
    	    let status = document.getElementById("reimbTypeSelect").value;
    	    
    	    let object = {
    	    		r_id: reimbursementId,
    	    		r_status: status
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
    	    		//appendToAllReims(obj);
    	    		//appendToPendingReims(obj);
    	    		
    	           
    	        }
    	    }
    
    	    xhr.open("post", "http://localhost:8080/FrontController/resolveReimbursement");
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
	            let pass = document.getElementById("userPassword");
	            let utype = document.getElementById("userType");
	            

	            fname.innerHTML = obj.firstName + " " + obj.lastName;
	            email.innerHTML = obj.email;
	            pass.innerHTML = obj.password;
	            utype.innerHTML = obj.user_type;
	            
	           
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
		    		    addToAllTable(obj1);
		    		}
		            
		        }
		    	
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/fillAllReimsManager");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send();
		}
		
		function addToAllTable(obj1){
			
			let id = obj1.r_id;
			let name = obj1.r_emp_name;
			let dateS = obj1.date_submitted;
			let status = obj1.r_status;
			let amount = obj1.r_amount;
			
			let row = document.createElement("tr");
			
			let idCol = document.createElement("td");
			let nameCol = document.createElement("td");
			let dateSCol = document.createElement("td");
			let statusCol = document.createElement("td");
			let amountCol = document.createElement("td");
		
			idCol.textContent = id;
			nameCol.textContent = name;
			dateSCol.textContent = dateS;
			statusCol.textContent = status; 
			amountCol.textContent = amount;
		
			row.appendChild(idCol);
			row.appendChild(nameCol);
			row.appendChild(dateSCol);
			row.appendChild(statusCol);
			row.appendChild(amountCol);
		
		document.getElementById("myTableAll").appendChild(row);
		}
		
		/**
		 * FILL RESOLVED REIMS
		 */
		function fillResolvedReimbursementTable(){
			
			

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
		    		    addToResolvedTable(obj1);
		    		}
		            
		        }
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/fillResolvedReimsManager");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send();
		}
		
		function addToResolvedTable(obj1){
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
		
		/**
		 * FILL RESOLVED REIMS
		 */
		function fillPendingReimbursementTable(){
			
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
		    		    addToPendingTable(obj1);
		    		}
		            
		        }
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/fillPendingReimsManager");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send();
		}
		
		function addToPendingTable(obj1){
			
			let id = obj1.r_id;
			let name = obj1.r_emp_name;
			let dateS = obj1.date_submitted;
			let status = obj1.r_status;
			let amount = obj1.r_amount;
			
			let row = document.createElement("tr");
			
			let idCol = document.createElement("td");
			let nameCol = document.createElement("td");
			let dateSCol = document.createElement("td");
			let statusCol = document.createElement("td");
			let amountCol = document.createElement("td");
		
			idCol.textContent = id;
			nameCol.textContent = name;
			dateSCol.textContent = dateS;
			statusCol.textContent = status; 
			amountCol.textContent = amount;
		
			row.appendChild(idCol);
			row.appendChild(nameCol);
			row.appendChild(dateSCol);
			row.appendChild(statusCol);
			row.appendChild(amountCol);
		
		document.getElementById("myTablePending").appendChild(row);
		}
		
		
		function updateManagerProfile(){
			
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
    	    console.log(object);
    	    var myJSON = JSON.stringify(object);

		    var xhr = new XMLHttpRequest();
		    
		    xhr.onreadystatechange = function(){
		
		    	console.log("response text: "+ //xhr.responseText+
				" http status: "+ xhr.status + 
				" http status text: "+ xhr.statusText + 
				" readyState: "+ xhr.readyState
		    	);
		    	
		    	if(xhr.readyState == 4 && xhr.status == 200){
		    		
		    			logout();
		    		
		    		}
		            
		    }

		    xhr.open("POST", "http://localhost:8080/FrontController/updateManagerProfile");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send(myJSON);
		    
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
		    		
		    		}
		            }

		    xhr.open("POST", "http://localhost:8080/FrontController/logout");
		    xhr.setRequestHeader("Content-Type", "application/json");
		    xhr.send();
		}
	
	
	

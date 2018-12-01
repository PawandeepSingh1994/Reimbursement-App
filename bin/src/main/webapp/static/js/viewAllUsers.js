

	window.onload = function(){
   
		fillAllUsers();
		document.getElementById("searchUserButton").addEventListener("click", searchForUser);
		document.getElementById("searchReimButton").addEventListener("click", searchForReimbursement);
	
		};

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
			
			
			let row = document.createElement("tr");
			let fnameCol = document.createElement("td");
			let lnameCol = document.createElement("td");
			let emailCol = document.createElement("td");
			
			fnameCol.textContent = first_Name;
			lnameCol.textContent = last_Name;
			emailCol.textContent = user_e_mail;
			
			row.appendChild(fnameCol);
			row.appendChild(lnameCol);
			row.appendChild(emailCol);
			
			document.getElementById("myTableAllUsers").appendChild(row);
		}
		
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
		
		function clearTable(table) {
			  var rows = table.rows;
			  var i = rows.length;
			  while (--i) {
			    rows[i].parentNode.removeChild(rows[i]);
			    // or
			    // table.deleteRow(i);
			  }
			}
		
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
		
		function printObj(obj){
			console.log(obj.r_man_name);
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
        	    		document.getElementById("reimbursementTypeDisplayReim").innerHTML = "";
        	    		document.getElementById("reimbursementDescriptionDisplayReim").innerHTML = "";
    	    			document.getElementById("noResultFoundReim").innerHTML = "No Results Found!"
    	    		}
    	    		else{
    	    		let obj = JSON.parse(xhr.responseText);
    	    		document.getElementById("employeeFullNameDisplayReim").innerHTML = obj.r_emp_name;
    	    		document.getElementById("employeeStatusReim").innerHTML = obj.r_status;
    	    		document.getElementById("reimbursementTypeDisplayReim").innerHTML = obj.r_type;
    	    		document.getElementById("reimbursementDescriptionDisplayReim").innerHTML = obj.r_description;
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
		 * ADD REIMBURSEMENT TO THE PAGE
		 */
		function addReimToPage(){
			
		}
		
		
		
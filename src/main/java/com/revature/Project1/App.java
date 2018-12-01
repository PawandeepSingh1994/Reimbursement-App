package com.revature.Project1;

import java.sql.SQLException;



import com.revature.dao.managerImplementation;

import com.revature.beans.reimbursement;
import com.revature.beans.user;

import com.revature.service.reimbursementService;
import com.revature.service.userService;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws ClassNotFoundException, SQLException
    {
        //System.out.println(managerService.getManagerService().createUserAccount(
    		   //new user("Chris", "Gayle", "cgayle@gmail.com", "cgayle")));
       
      // System.out.println(managerService.getManagerService().createManagerAccount(
    		   //new manager("Changhe", "Yuan", "cyuan@qmail.com", "cyuan")));
   
    
       //System.out.println(reimbursementService.getReimbursementService().submitReimbursementRequest(
    		  //new reimbursement("Relocation", "Relocation from NYYYYYYYYY", 250.90, "Pending", 1)));
    	
    	//managerService.getManagerService().updateManager(new manager(1, "Jerry", "Waxman", "jwaxman@gmail.com", "jwaxman"));
        // System.out.println(managerService.getManagerService().getAllUsersInfo());
    	//System.out.println(managerService.getManagerService().getAllManagersInfo());
    	
    	//System.out.println(managerService.getManagerService().getManagerInfo("smane@qmail.com", "smane"));
    	//System.out.println(managerService.getManagerService().getUserInfo("rsharma@gmail.com", "password"));
    	//userService.getUserService().updateUserInfo(new user(3, "Shikhar", "Dhawan", "sdhawan@yahoo.com", "sdhawan"));
    
    	//reimbursementService.getReimbursementService().resolveReimbursementRequest(new reimbursement(8, 3));
  
    	//System.out.println(reimbursementService.getReimbursementService().listResolvedReimbursementsData("Resolved"));
    	//System.out.println(getManager("jwaxman@gmail.com", "jwaxman"));
    	//System.out.println(getUser("rsharma@gmail.com", "password"));
    	
    	//System.out.println(reimbursementService.getReimbursementService().managerName(8));
    	
    	//System.out.println(reimbursementService.getReimbursementService().listResolvedReimbursementsData());
    	//System.out.println(userService.getUserService().listResolvedReimbursementEachEmployee(3));
    	//System.out.println(reimbursementService.getReimbursementService().getReimbursement(8));
    	//System.out.println(userService.getUserService().getUserInfo("mclarke@gmail.com", "mclarke"));
    	//System.out.println(userService.getUserService().listAllReimbursementsEachEmployee(4));
    	user us = new user();
    	us.setUser_id(4);
    	us.setPassword("vkohli");
    	
    	//System.out.println(us);
    	System.out.println(userService.getUserService().updateUserPass(us));
    	
    	//System.out.println(userService.getUserService().listResolvedReimbursementEachEmployee(4));
    }
    
    public user getUser(String email, String password) throws ClassNotFoundException, SQLException {
    	return userService.getUserService().getUserInfo(email, password);
    }
    
    public boolean ifUserAdded(String tableName, String username) throws SQLException, ClassNotFoundException {
    	return managerImplementation.getManagerDao().ifUserSuccessfullyAdded(username);
    }
    
    public boolean AddReimbursement(reimbursement r) throws ClassNotFoundException, SQLException {
    	return reimbursementService.getReimbursementService().submitReimbursementRequest(r);
    }
    
    public boolean checkIfReimbursementExistInTable(int description) throws SQLException, ClassNotFoundException {
    	return reimbursementService.getReimbursementService().checkIfReimbursementAdded(description);
    }
}

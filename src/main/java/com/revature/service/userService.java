package com.revature.service;
import com.revature.beans.reimbursement;


import com.revature.beans.user;
import com.revature.dao.UserImplementation;


import java.sql.SQLException;
import java.util.ArrayList;



public class userService {
	
private static userService uService;
	
	private userService() {
		
	}

	public static userService getUserService() {
		if(uService == null) {
			uService = new userService();
		}
		return uService;
	}
	
	public int updateUserInfo(user user) throws ClassNotFoundException, SQLException {
		return UserImplementation.getUserDao().updateUserInformation(user);
	}
	public user getUserInfo(String email, String password) throws ClassNotFoundException, SQLException {
		return UserImplementation.getUserDao().getUser(email, password);
	}
	public ArrayList<reimbursement> listAllReimbursementsEachEmployee(int user_id) throws ClassNotFoundException, SQLException{
		return UserImplementation.getUserDao().listAllReimbursementsPerEmployee(user_id);
	}  
	public int getUserIdNum(String firstname, String lastname) throws ClassNotFoundException, SQLException {
		return UserImplementation.getUserDao().getUserId(firstname, lastname);
	}
	public boolean ifUsernameExists(user username) throws SQLException {
		return UserImplementation.getUserDao().ifUserExists(username);
	}
	public boolean updateUserPass(user user) throws SQLException {
		return UserImplementation.getUserDao().updatePassword(user);
	}

}

package com.revature.service;



import com.revature.beans.user;
import com.revature.dao.managerImplementation;


import java.sql.SQLException;
import java.util.ArrayList;




public class managerService {
	
private static managerService manService;
	
	private managerService() {
		
	}

	public static managerService getManagerService() {
		if(manService == null) {
			manService = new managerService();
		}
		return manService;
	}
	
	
	public user getUserInfo(String email, String password) throws ClassNotFoundException, SQLException {
		return managerImplementation.getManagerDao().getUser(email, password);
	}
	
	public boolean createUserAccount(user user) throws ClassNotFoundException, SQLException {
		return managerImplementation.getManagerDao().createUser(user);
	}
	
	public int updateManager(user newUser) throws ClassNotFoundException, SQLException {
		return managerImplementation.getManagerDao().updateUserInformation(newUser);
	}
	
	public ArrayList<user> getAllUsersInfo() throws ClassNotFoundException, SQLException{
		return managerImplementation.getManagerDao().getAllUsers();
	}
	
	

}

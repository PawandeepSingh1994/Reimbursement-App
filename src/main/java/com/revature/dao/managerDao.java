
package com.revature.dao;

import java.sql.SQLException;

import java.util.ArrayList;
import com.revature.beans.user;

public interface managerDao {
	
	
	public user getUser(String email, String password) throws ClassNotFoundException, SQLException;
	public boolean createUser(user user) throws ClassNotFoundException, SQLException;
	public int updateUserInformation(user manager) throws ClassNotFoundException, SQLException;
	public ArrayList<user> getAllUsers() throws ClassNotFoundException, SQLException;
	
	
	
	
	

}

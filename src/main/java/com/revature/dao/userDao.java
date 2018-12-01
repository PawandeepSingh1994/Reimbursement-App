package com.revature.dao;
import java.sql.SQLException;
import java.util.ArrayList;

import com.revature.beans.reimbursement;
import com.revature.beans.user;




public interface userDao {
	
	public int updateUserInformation(user user) throws ClassNotFoundException, SQLException;
	public boolean updatePassword(user user) throws SQLException;
	public user getUser(String email, String password) throws ClassNotFoundException, SQLException;
	public ArrayList<reimbursement> listAllReimbursementsPerEmployee(int user_id) throws ClassNotFoundException, SQLException;
	public int getUserId(String firstname, String lastname) throws ClassNotFoundException, SQLException;
	public boolean ifUserExists(user username) throws SQLException;

}

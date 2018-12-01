
package com.revature.dao;


import com.revature.beans.user;
import com.revature.controller.FrontController;


import java.sql.CallableStatement;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;


import org.apache.log4j.Logger;

import com.revature.util.JDBCConnectionUtil;


public class managerImplementation implements managerDao {
	final static Logger log = Logger.getLogger(FrontController.class);
	static managerImplementation managerDao;
	private static JDBCConnectionUtil cu = JDBCConnectionUtil.getInstance();
	

	private managerImplementation(){
		
	}
	
	public static managerImplementation getManagerDao() {
		if(managerDao == null) {
			managerDao = new managerImplementation();
		}
		return managerDao;
	}
	

	public user getUser(String email, String password) throws ClassNotFoundException, SQLException{
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql = "select * from the_user where email_address = ? and pass_word = ?";
			PreparedStatement pstm = conn.prepareStatement(sql);
			pstm.setString(1, email);
			pstm.setString(2, password);
			
			ResultSet rs = pstm.executeQuery();
			log.info("User info Returned");
			
			while(rs.next()) {
				return new user(rs.getInt("user_id"), 
						rs.getString("first_name"), 
						rs.getString("last_name"), 
						rs.getString("email_address"), 
						rs.getString("pass_word"), 
						rs.getString("phone_number"), 
						rs.getString("user_auth"));
			}
			
		} catch (SQLException e) {
			log.error("SQL Exception while accessing user");
			e.printStackTrace();
		} finally {
			conn.close();
		}
		return null;
	}

	public boolean createUser(user user) throws ClassNotFoundException, SQLException{
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String storedProc = "call add_new_user(?, ?, ?, ?, ?, ?)";
			CallableStatement pps = conn.prepareCall(storedProc);
			
			//pstm.setInt(1, Customer.getC_id());
			//pps.setFloat(1, user.getUser_id());
			pps.setString(1, user.getFirstName());
			pps.setString(2, user.getLastName());
			pps.setString(3, user.getEmail());
			pps.setString(4, user.getPassword());
			pps.setString(5, user.getPhone_number());
			pps.setString(6, user.getUser_type());
			
			pps.executeUpdate();
			
			log.info("New user created");
			if(ifUserSuccessfullyAdded(user.getEmail())) {
				return true;
			}
			
			return true;
		} catch (SQLException e) {
			log.error("SQL Exception while creating a new user");
			e.printStackTrace();
		}finally {
			conn.close();
		}
		return false;
		
	}

	/**
	 * Helper method for insertCustomer method to check if user successfully inserted.
	 * @throws ClassNotFoundException 
	 */
	public boolean ifUserSuccessfullyAdded(String username) throws SQLException, ClassNotFoundException {
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql;
			
			sql = "select * from the_user where email_address = ?";
			
			PreparedStatement pstm = conn.prepareStatement(sql);
			pstm.setString(1, username);
			
			ResultSet rs = pstm.executeQuery();
			
			if(rs.next()==true) {
				return true;
			}
			} catch (SQLException e) {
				
				e.printStackTrace();
			}finally {
				conn.close();
			}
		return false;
		}
	
	public int updateUserInformation(user user) throws ClassNotFoundException, SQLException {
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql = "update the_user set first_name = ? , last_name = ? , "
					+ "email_address = ? , phone_number = ? where user_id = ?";
			
			PreparedStatement pstm = conn.prepareStatement(sql);
	
			pstm.setString(1, user.getFirstName());
			pstm.setString(2, user.getLastName());
			pstm.setString(3, user.getEmail());
			pstm.setString(4, user.getPhone_number());
			pstm.setInt(5, user.getUser_id());
			pstm.executeUpdate();
			log.info("User info returned");
			return 1;
			} catch (SQLException e) {
				log.error("SQL Exception while returning user info");
			e.printStackTrace();
		}finally {
			conn.close();
		}
		
		return 0;
	}

	public ArrayList<user> getAllUsers() throws ClassNotFoundException, SQLException{
		
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql = "select * from the_user where user_auth = 'User' or user_auth = 'Manager'";
			Statement stmt = conn.createStatement();
			
			//as compared to prepared statement. we pass in sql in executeQuery();
			ResultSet rs = stmt.executeQuery(sql);
			ArrayList<user> custList = new ArrayList<>();
			log.info("All users returned");
			while(rs.next()) {
				custList.add(
						new user(rs.getInt("user_id"), 
								rs.getString("first_name"), 
								rs.getString("last_name"), 
								rs.getString("email_address"), 
								rs.getString("pass_word"), 
								rs.getString("phone_number"), 
								rs.getString("user_auth")));
				
			}
			return custList;
			
		} catch (SQLException e) {
			log.error("SQL exception while returning all users");
			e.printStackTrace();
		}finally {
			conn.close();
		}
		return new ArrayList<>();
		
		}
	
}

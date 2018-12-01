package com.revature.dao;

import com.revature.beans.reimbursement;


import com.revature.beans.user;
import com.revature.controller.FrontController;


import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;

import org.apache.log4j.Logger;

import com.revature.util.JDBCConnectionUtil;

public class UserImplementation implements userDao{

	final static Logger log = Logger.getLogger(FrontController.class);
	static UserImplementation userDao;
	private static JDBCConnectionUtil cu = JDBCConnectionUtil.getInstance();
	
	private UserImplementation(){
		
	}
	
	public static UserImplementation getUserDao() {
		if(userDao == null) {
			userDao = new UserImplementation();
		}
		return userDao;
	}

	public int updateUserInformation(user user) throws ClassNotFoundException, SQLException {
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql = "update the_user set first_name = ? , last_name = ? , "
					+ "email_address = ? , phone_number = ? where user_id = ?";
			
			PreparedStatement pstm = conn.prepareStatement(sql);
			log.info("User info updated");
			pstm.setString(1, user.getFirstName());
			pstm.setString(2, user.getLastName());
			pstm.setString(3, user.getEmail());
			pstm.setString(4, user.getPhone_number());
			pstm.setInt(5, user.getUser_id());
			pstm.executeUpdate();
			
			return 1;
			
			} catch (SQLException e) {
			log.error("SQL Exception while updating user info");
			e.printStackTrace();
			}finally {
				conn.close();
			}
		
		return 0;
	}

	public boolean updatePassword(user user) throws SQLException {
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql = "update the_user set pass_word = ? where user_id = ?";
			PreparedStatement pstm = conn.prepareStatement(sql);
			pstm.setString(1, user.getPassword());
			pstm.setInt(2, user.getUser_id());
			
			pstm.executeUpdate();
			log.info("User password updated");
			return true;
			
		} catch (SQLException e) {
			log.error("SQL Exception while updating user password");
			e.printStackTrace();
		} finally {
			conn.close();
		}
		return false;
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
			log.info("User info returned");
			
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
			log.error("SQL Exception returning user info");
			e.printStackTrace();
		} finally {
			conn.close();
		}
		return null;
	}
	
	public ArrayList<reimbursement> listAllReimbursementsPerEmployee(int user_id) throws ClassNotFoundException, SQLException {
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			
			String sql = "SELECT r.r_id, r.r_type, r.r_date_submitted, "
					+ "r.r_date_resolved, r.r_description, r.r_amount, r.r_status, "
					+ "r.r_emp_id, r.r_man_id, us.first_name, us.last_name,  " + 
					" mt.first_name as m_first_name, mt.last_name as m_last_name " + 
					"FROM reimbursement_system r " + 
					"LEFT JOIN the_user us ON us.user_id = r.r_emp_id " + 
					"left join the_user mt on mt.user_id = r.r_man_id " + 
					"where us.user_id = ?";
			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setInt(1, user_id);
			log.info("All reimbursements for single employee returned");
			ArrayList<reimbursement> custList = new ArrayList<>();
			ResultSet rs = stmt.executeQuery();
			if(rs.next()) {
			while(rs.next()) {
				
				custList.add(new reimbursement(
						rs.getInt("r_id"),
						rs.getString("r_type"), 
						rs.getString("r_date_submitted"),
						rs.getString("r_date_resolved"), 
						rs.getString("r_description"), 
						rs.getDouble("r_amount"),
						rs.getString("r_status"),
						rs.getInt("r_emp_id"),
						rs.getInt("r_man_id"),
						rs.getString("first_name") + " " + rs.getString("last_name"),
						rs.getString("m_first_name") + " " + rs.getString("m_last_name")));
				
			}
			return custList;
			}
		} catch (SQLException e) {
			log.error("SQL Exception while returning all reimbursements for single employee");
			e.printStackTrace();
		} finally {
			conn.close();
		}
		return null;
	}
	
	public int getUserId(String firstname, String lastname) throws ClassNotFoundException, SQLException{
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql = "select user_id from the_user where first_name = ? and last_name = ?";
			PreparedStatement pstm = conn.prepareStatement(sql);
			pstm.setString(1, firstname);
			pstm.setString(2, lastname);
			
			ResultSet rs = pstm.executeQuery();
			
			
			while(rs.next()) {
				return rs.getInt("user_id");
			}
			
		} catch (SQLException e) {
			
			e.printStackTrace();
		}finally {
			conn.close();
		}
		return 0;
	}
	
	public boolean ifUserExists(user username) throws SQLException {
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql = "select * from the_user where email_address = ?";
			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setString(1, username.getEmail());
			
			//as compared to prepared statement. we pass in sql in executeQuery();
			ResultSet rs = stmt.executeQuery();
			log.info("Checked if username exists or not");
			String output;
			while(rs.next()) {
				output = rs.getString("pass_word");
				if(username.getPassword().compareToIgnoreCase(output)==0) {
					return false;
				}
				else if(username.getPassword().compareToIgnoreCase(output)!=0) {
					return true;
				}
			}
			} catch (SQLException e) {
				log.error("Error while checking if user exists in the database!");
				e.printStackTrace();
			}finally {
				conn.close();
			}
		
		return false;
	}

}

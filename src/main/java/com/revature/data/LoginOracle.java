package com.revature.data;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.revature.beans.user;
import com.revature.util.JDBCConnectionUtil;

public class LoginOracle implements LoginDao {
	private static JDBCConnectionUtil cu = JDBCConnectionUtil.getInstance();
	
	
	@Override
	public user login(String username, String password) {
		
		Connection conn = null;
		conn = cu.getConnection();
		String sql = "Select * from the_user "
				+ "where email_address = ? and pass_word = ?";
	
		try {
			PreparedStatement pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,username);
			pstmt.setString(2,password);
			
			ResultSet rs = pstmt.executeQuery();
			if(rs.next()) {
				return new user(rs.getInt("user_id"), 
						rs.getString("first_name"), 
						rs.getString("last_name"), 
						rs.getString("email_address"), 
						rs.getString("pass_word"), 
						rs.getString("phone_number"), 
						rs.getString("user_auth"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
}

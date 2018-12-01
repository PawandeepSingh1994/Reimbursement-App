package com.revature.dao;

import com.revature.beans.reimbursement;



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

public class reimbursementImplementation implements reimbursementDao{

	final static Logger log = Logger.getLogger(FrontController.class);
	static reimbursementImplementation reimbursementDao;
	private static JDBCConnectionUtil cu = JDBCConnectionUtil.getInstance();

	private reimbursementImplementation(){
		
	}
	
	public static reimbursementImplementation getReimbursementDao() {
		if(reimbursementDao == null) {
			reimbursementDao = new reimbursementImplementation();
		}
		return reimbursementDao;
	}
	
	public boolean submitReimbursement(reimbursement rs) throws ClassNotFoundException, SQLException {
		
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String storedProc = "call add_new_reimbursement(?, ?, ?, ?)";
			CallableStatement pps = conn.prepareCall(storedProc);
			
			
			pps.setString(1, rs.getR_type());
			pps.setString(2, rs.getR_description());
			pps.setDouble(3, rs.getR_amount());
			pps.setInt(4, rs.getR_emp_id());
			
			
			pps.executeUpdate();
			log.info("New reimbursement submitted");
			
			if(ifReimbursementSuccessfullyAdded(rs.getR_emp_id())) {
				return true;
			}
			
			return true;
		} catch (SQLException e) {
			log.error("SQL exception while adding new reimbursement");
			e.printStackTrace();
		}finally {
			conn.close();
		}
		return false;
	}
	
	/**
	 * Helper method for submitReimbursement method to check if reinbursement successfully inserted.
	 * @throws ClassNotFoundException 
	 */
	public boolean ifReimbursementSuccessfullyAdded(int id) throws SQLException, ClassNotFoundException {
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql;
			
			sql = "select * from reimbursement_system where r_emp_id = ?";
			
			PreparedStatement pstm = conn.prepareStatement(sql);
			pstm.setInt(1, id);
			
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
	
	public reimbursement getReimbursement(int id) throws ClassNotFoundException, SQLException{
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql = "SELECT r.r_id, r.r_type, r.r_date_submitted, "
					+ "r.r_date_resolved, r.r_description, r.r_amount, r.r_status, "
					+ "r.r_emp_id, r.r_man_id, us.first_name, us.last_name,  " + 
					" mt.first_name as m_first_name, mt.last_name as m_last_name " + 
					"FROM reimbursement_system r " + 
					"LEFT JOIN the_user us ON us.user_id = r.r_emp_id " + 
					"left join the_user mt on mt.user_id = r.r_man_id where r.r_id = ?";
				PreparedStatement pstm = conn.prepareStatement(sql);
				pstm.setInt(1, id);
			
			ResultSet rs = pstm.executeQuery();
			log.info("Reimbursement info returned");
			
			while(rs.next()) {
				//returns employee fullname, type, description, amount, status and manager name
				return new reimbursement(
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
						rs.getString("m_first_name") + " " + rs.getString("m_last_name"));
			}
			
		} catch (SQLException e) {
			log.error("SQL exception while returning reimbursement info");
			e.printStackTrace();
		}finally {
			conn.close();
		}
		return null;
	}

	public int resolveReimbursement(reimbursement rs) throws ClassNotFoundException, SQLException {

		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql = "call resolve_reimbursement(?,?,?)";
			
			PreparedStatement pstm = conn.prepareStatement(sql);
			
			pstm.setInt(1, rs.getR_id());
			pstm.setInt(2, rs.getR_man_id());
			pstm.setString(3, rs.getR_status());
			
			log.info("Reimbursement resolved");
			pstm.executeUpdate();
			
			return 1;
			} catch (SQLException e) {
			log.error("SQL exception while resolving a reimbursement");
			e.printStackTrace();
		}finally {
			conn.close();
		}
		return 0;
		
	}

	public ArrayList<reimbursement> listAllReimbursements() throws ClassNotFoundException, SQLException {
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql = "SELECT r.r_id, r.r_type, r.r_date_submitted, " + 
					" r.r_date_resolved, r.r_description, r.r_amount, r.r_status, " + 
					" r.r_emp_id, r.r_man_id, us.first_name, us.last_name,  " + 
					" mt.first_name as m_first_name, mt.last_name as m_last_name " +  
					"FROM reimbursement_system r " + 
					"LEFT JOIN the_user us ON us.user_id = r.r_emp_id " + 
					"left join the_user mt on mt.user_id = r.r_man_id";
			Statement stmt = conn.createStatement();
			
			ResultSet rs = stmt.executeQuery(sql);
			ArrayList<reimbursement> custList = new ArrayList<>();
			log.info("All reimbursements returned");
			while(rs.next()) {
				//returns r_id, dateSubmitted, type , status, amount, employee name
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
			
		} catch (SQLException e) {
			log.error("SQL exception while returning all reimbursements");
			e.printStackTrace();
		}finally {
			conn.close();
		}
		return new ArrayList<>();
	}

	
	public int getReimId(String descr) throws ClassNotFoundException, SQLException{
		Connection conn = null;
		conn = cu.getConnection();
		
		try {
			String sql = "select r_id from reimbursement_system where r_description = ?";
			PreparedStatement pstm = conn.prepareStatement(sql);
			pstm.setString(1, descr);
			
			ResultSet rs = pstm.executeQuery();
			
			
			while(rs.next()) {
				return rs.getInt("r_id");
			}
			
		} catch (SQLException e) {
			
			e.printStackTrace();
		}finally {
			conn.close();
		}
		return 0;
	}
	
}

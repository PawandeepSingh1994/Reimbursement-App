package com.revature.service;
import com.revature.beans.reimbursement;



import com.revature.dao.reimbursementImplementation;
import java.sql.SQLException;
import java.util.ArrayList;



public class reimbursementService {
	
private static reimbursementService reimService;
	
	private reimbursementService() {
		
	}

	public static reimbursementService getReimbursementService() {
		if(reimService == null) {
			reimService = new reimbursementService();
		}
		return reimService;
	}
	
	public boolean submitReimbursementRequest(reimbursement rs) throws ClassNotFoundException, SQLException {
		return reimbursementImplementation.getReimbursementDao().submitReimbursement(rs);
	}
	public boolean checkIfReimbursementAdded(int description) throws SQLException, ClassNotFoundException {
		return reimbursementImplementation.getReimbursementDao().ifReimbursementSuccessfullyAdded(description);
	}
	public int resolveReimbursementRequest(reimbursement rs) throws ClassNotFoundException, SQLException {
		return reimbursementImplementation.getReimbursementDao().resolveReimbursement(rs);
	}
	public ArrayList<reimbursement> listAllReimbursementsData() throws ClassNotFoundException, SQLException{
		return reimbursementImplementation.getReimbursementDao().listAllReimbursements();
	}
	
	public int reimId(String des) throws ClassNotFoundException, SQLException {
		return reimbursementImplementation.getReimbursementDao().getReimId(des);
	}
	public reimbursement getReimbursement(int id) throws ClassNotFoundException, SQLException{
		return reimbursementImplementation.getReimbursementDao().getReimbursement(id);
	}

}

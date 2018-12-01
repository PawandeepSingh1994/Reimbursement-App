package com.revature.dao;



import java.sql.SQLException;

import java.util.ArrayList;
import com.revature.beans.reimbursement;


public interface reimbursementDao {
	
	public boolean submitReimbursement(reimbursement rs) throws ClassNotFoundException, SQLException;
	public reimbursement getReimbursement(int id) throws ClassNotFoundException, SQLException;
	public int resolveReimbursement(reimbursement rs) throws ClassNotFoundException, SQLException;
	public ArrayList<reimbursement> listAllReimbursements() throws ClassNotFoundException, SQLException;
	public int getReimId(String manId) throws ClassNotFoundException, SQLException;
	

}

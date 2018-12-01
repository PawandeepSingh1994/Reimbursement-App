package com.revature.data;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.beans.reimbursement;
import com.revature.beans.user;
import com.revature.service.managerService;
import com.revature.service.reimbursementService;
import com.revature.service.userService;

public class viewAllUsersOracle {

	/**
	 * 
	 * @param req
	 * @param resp
	 * @throws ServletException
	 * @throws IOException
	 * @throws SQLException 
	 */
	public void searchUser(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, SQLException {
		
		ObjectMapper mapper = new ObjectMapper();
		
		user us = mapper.readValue(req.getReader(), user.class);
		user newUser = (user) req.getSession().getAttribute("manager");
		try {
			if(newUser.getUser_type().compareTo("Manager")==0) {
			int id = userService.getUserService().getUserIdNum(us.getFirstName(), us.getLastName());
			ArrayList<reimbursement> list = userService.getUserService().listAllReimbursementsEachEmployee(id); 
			resp.setHeader("Content-Type", "application/json");
			mapper.writeValue(resp.getOutputStream(), list);
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		}

	/**
	 * 
	 * @param req
	 * @param resp
	 * @throws ServletException
	 * @throws IOException
	 * @throws SQLException 
	 */
	public void searchReimbursement(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, SQLException {
	
	
	ObjectMapper mapper = new ObjectMapper();
	
	reimbursement us = mapper.readValue(req.getReader(), reimbursement.class);
	user newUser = (user) req.getSession().getAttribute("manager");
	try {
		if(newUser.getUser_type().compareTo("Manager")==0) {
		int reim_id = us.getR_id();
		reimbursement rs = reimbursementService.getReimbursementService().getReimbursement(reim_id);
		resp.setHeader("Content-Type", "application/json");
		
		mapper.writeValue(resp.getOutputStream(), rs);
		}
	} catch (ClassNotFoundException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	}

	/**
	 * 
	 * @param req
	 * @param resp
	 * @throws ServletException
	 * @throws IOException
	 * @throws SQLException 
	 */
	public void fillAllUser(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, SQLException {
	
	ObjectMapper mapper = new ObjectMapper();
	user newUser = (user) req.getSession().getAttribute("manager");
	try {
			if(newUser.getUser_type().compareTo("Manager")==0) {
			ArrayList<user> list = managerService.getManagerService().getAllUsersInfo(); 
			resp.setHeader("Content-Type", "application/json");
			mapper.writeValue(resp.getOutputStream(), list);
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	
	}
	
}

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
import com.revature.delegate.LoginDelegate;
import com.revature.service.managerService;
import com.revature.service.reimbursementService;
import com.revature.service.userService;

public class employeeHomepageOracle {

	LoginDelegate ld = new LoginDelegate();
	
	/**
	 * 
	 * @param req
	 * @param resp
	 * @throws ServletException
	 * @throws IOException
	 * @throws SQLException 
	 */
	public void fillAllReimTable(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, SQLException {
		
		ObjectMapper mapper = new ObjectMapper();
	
		try {
				user newUser = (user) req.getSession().getAttribute("user");
				ArrayList<reimbursement> list = userService.getUserService().listAllReimbursementsEachEmployee(newUser.getUser_id()); 
				resp.setHeader("Content-Type", "application/json");
				mapper.writeValue(resp.getOutputStream(), list);
				
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		
		
		}
	
	
	public void submitReim(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, SQLException {
		
		try {
			user newUser = (user) req.getSession().getAttribute("user");
			
			reimbursement newReim = new reimbursement();
			newReim.setR_type(req.getParameter("type"));
			newReim.setR_description(req.getParameter("decription"));
			newReim.setR_amount(Double.parseDouble(req.getParameter("reimAmount")));
			newReim.setR_emp_id(newUser.getUser_id());
			
			reimbursementService.getReimbursementService().submitReimbursementRequest(newReim);
			resp.sendRedirect("/FrontController/static/employeeHomepage.html");
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
	public void updateProfile(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, SQLException {
		
		ObjectMapper mapper = new ObjectMapper();
		
		user us = mapper.readValue(req.getReader(), user.class);
		
		try {
		user newUser = (user) req.getSession().getAttribute("user");
		
		user newInfo = new user();
		newInfo.setUser_id(newUser.getUser_id());
		newInfo.setFirstName(us.getFirstName());
		newInfo.setLastName(us.getLastName());
		newInfo.setEmail(us.getEmail());
		newInfo.setPassword(newUser.getPassword());
		newInfo.setPhone_number(us.getPhone_number());
		newInfo.setUser_type(newUser.getUser_type());
		
		if(userService.getUserService().ifUsernameExists(newInfo)) {
			resp.setHeader("Content-Type", "application/json");
			mapper.writeValue(resp.getOutputStream(), false);
		}
		else {
		userService.getUserService().updateUserInfo(newInfo);
		req.getSession().removeAttribute("user");
		req.getSession().setAttribute("user", newInfo);
	
		resp.setHeader("Content-Type", "application/json");
		mapper.writeValue(resp.getOutputStream(), true);
		}
	} catch (ClassNotFoundException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	}
	
	public boolean updatePassword(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, ClassNotFoundException, SQLException {
		
		ObjectMapper mapper = new ObjectMapper();
		
		user us = mapper.readValue(req.getReader(), user.class);
		
		user newUser = (user) req.getSession().getAttribute("user");
		
		if(newUser.getPassword().compareTo(us.getFirstName())!=0) { // firstname is actually old password!
			
			resp.setHeader("Content-Type", "application/json");
			mapper.writeValue(resp.getOutputStream(), false);
		}
		else {
			user newInfo = new user();
			newInfo.setUser_id(newUser.getUser_id());
			newInfo.setFirstName(newUser.getFirstName());
			newInfo.setLastName(newUser.getLastName());
			newInfo.setEmail(newUser.getEmail());
			newInfo.setPassword(us.getPassword());
			newInfo.setPhone_number(newUser.getPhone_number());
			newInfo.setUser_type(newUser.getUser_type());
			
			req.getSession().removeAttribute("user");
			req.getSession().setAttribute("user", newInfo);
			userService.getUserService().updateUserPass(newInfo);
			
			
			
			resp.setHeader("Content-Type", "application/json");
			mapper.writeValue(resp.getOutputStream(), true);
			
		}
		
		return true;
	}

	/**
	 * 
	 * @param req
	 * @param resp
	 * @throws ServletException
	 * @throws IOException
	 * @throws SQLException 
	 */
	public void displayUserData(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, SQLException {
	
	ObjectMapper mapper = new ObjectMapper();
	
	//manager us = mapper.readValue(req.getReader(), manager.class);
	//System.out.println(us);
	
	try {
		user newUser1 = (user) req.getSession().getAttribute("user");
		user newUser = managerService.getManagerService().getUserInfo(newUser1.getEmail(), newUser1.getPassword());
		resp.setHeader("Content-Type", "application/json");
		mapper.writeValue(resp.getOutputStream(), newUser);
		
	} catch (ClassNotFoundException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

}


	
}

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

public class managerHomepageOracle {

	/**
	 * 
	 * @param req
	 * @param resp
	 * @throws ServletException
	 * @throws IOException
	 * @throws SQLException 
	 */
	public void resolveReim(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, SQLException {
		
		try {
			user newUser = (user) req.getSession().getAttribute("manager");
			reimbursement newReim = new reimbursement();
			newReim.setR_id(Integer.parseInt(req.getParameter("reimNum")));
			newReim.setR_status(req.getParameter("reimStatus"));;
			newReim.setR_man_id(newUser.getUser_id());
			reimbursementService.getReimbursementService().resolveReimbursementRequest(newReim); 
			resp.sendRedirect("/FrontController/static/managerHomepage.html");
			
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
	public void fillAllReimTable(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, SQLException {
	
		
		ObjectMapper mapper = new ObjectMapper();
		user newUser = (user) req.getSession().getAttribute("manager");
		
		try {
			if(newUser.getUser_type().compareTo("Manager")==0) {
				ArrayList<reimbursement> list = reimbursementService.getReimbursementService().listAllReimbursementsData(); 
				resp.setHeader("Content-Type", "application/json");
				mapper.writeValue(resp.getOutputStream(), list);
				}
				
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		
		
		}
	
	public void displayUserData(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, SQLException {
	
	ObjectMapper mapper = new ObjectMapper();
	
	try {
		user newUser1 = (user) req.getSession().getAttribute("manager");
		user newUser = managerService.getManagerService().getUserInfo(newUser1.getEmail(), newUser1.getPassword());
		resp.setHeader("Content-Type", "application/json");
		mapper.writeValue(resp.getOutputStream(), newUser);
		
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
		user newUser = (user) req.getSession().getAttribute("manager");
		
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
		req.getSession().removeAttribute("manager");
		req.getSession().setAttribute("manager", newInfo);
		
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
		
		user newUser = (user) req.getSession().getAttribute("manager");
		
		if(newUser.getPassword().compareTo(us.getFirstName())!=0) { // firstname is actually old password!
			System.out.println("false");
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
			
			req.getSession().removeAttribute("manager");
			req.getSession().setAttribute("manager", newInfo);
			userService.getUserService().updateUserPass(newInfo);
			
			System.out.println(req.getAttribute("manager"));
			
			resp.setHeader("Content-Type", "application/json");
			mapper.writeValue(resp.getOutputStream(), true);
			System.out.println("true");
		}
		
		return true;
	}

		/**
		 * @throws SQLException 
		 * 
		 */
		public void addNewUser(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, ClassNotFoundException, SQLException{
			
			ObjectMapper mapper = new ObjectMapper();
			
			user us = mapper.readValue(req.getReader(), user.class);
			
			try {
				
				if(userService.getUserService().ifUsernameExists(us)) {
					resp.setHeader("Content-Type", "application/json");
					mapper.writeValue(resp.getOutputStream(), false);
				}
				else {
				managerService.getManagerService().createUserAccount(us);
				resp.setHeader("Content-Type", "application/json");
				mapper.writeValue(resp.getOutputStream(), true);
				}
			}catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}

		
	}
	
	


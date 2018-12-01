package com.revature.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.revature.data.employeeHomepageOracle;
import com.revature.data.managerHomepageOracle;
import com.revature.data.viewAllUsersOracle;
import com.revature.delegate.HomeDelegate;
import com.revature.delegate.LoginDelegate;

public class RequestHelper {
	
	private HomeDelegate hd = new HomeDelegate();
	private LoginDelegate ld = new LoginDelegate();
	private employeeHomepageOracle eh = new employeeHomepageOracle();
	private viewAllUsersOracle va = new viewAllUsersOracle();
	private managerHomepageOracle mh = new managerHomepageOracle();
	final static Logger log = Logger.getLogger(FrontController.class);
	
	public void process(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, ClassNotFoundException, SQLException {
		
		String switchString = req.getRequestURI().substring(req.getContextPath().length()+1);
		while(switchString.indexOf("/")>0) {
			switchString = switchString.substring(0, switchString.indexOf("/"));
		}
		log.info("RequestHelper accessed");
		switch(switchString) {
		
		case "home": hd.goHome(req, resp); break;
		case "login": if("POST".equals(req.getMethod())) {
			ld.login(req, resp);
		} else {
			ld.getPage(req, resp);
		} break; 
		case "logoutAccount": ld.logout(req, resp); break;
		case "fillallusers": va.fillAllUser(req, resp); break;
		case "searchForUser": va.searchUser(req, resp); break;
		case "searchReim": va.searchReimbursement(req, resp); break;
		case "submitNewReimbursement": eh.submitReim(req, resp); break;
		case "fillAllReimTableEmployee": eh.fillAllReimTable(req, resp); break;
		case "updateUserProfile": eh.updateProfile(req, resp); break;
		case "fillUserProfileInfo": eh.displayUserData(req, resp); break;
		case "resolveReimbursement": mh.resolveReim(req, resp); break;
		case "fillAllReimsManager": mh.fillAllReimTable(req, resp); break;
		case "fillManagerProfileInfo": mh.displayUserData(req, resp); break;
		case "updateManagerProfile": mh.updateProfile(req, resp); break;
		case "updateManagerPass": mh.updatePassword(req, resp); break;
		case "updateUserPass": eh.updatePassword(req, resp); break;
		case "addNewUser": mh.addNewUser(req, resp); break;
		default: break;
		}
	}
}

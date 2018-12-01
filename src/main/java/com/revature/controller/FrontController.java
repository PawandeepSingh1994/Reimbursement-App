package com.revature.controller;

import java.io.IOException

;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.servlets.DefaultServlet;
import org.apache.log4j.Logger;



public class FrontController extends DefaultServlet {
	private static final long serialVersionUID = 3479236907455377769L;
	
	private RequestHelper rh = new RequestHelper();
	final static Logger log = Logger.getLogger(FrontController.class);  
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
	 	if(req.getRequestURI().substring(req.getContextPath().length())
				.startsWith("/static/")) {
			
			super.doGet(req, resp);
			
		}
		else {
			try {
				rh.process(req, resp);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
			
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req,resp);
	}
	
}

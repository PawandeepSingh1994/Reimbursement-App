package com.revature.delegate;

import java.io.IOException;



import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


import com.revature.beans.user;
import com.revature.data.LoginDao;
import com.revature.data.LoginOracle;

public class LoginDelegate {
	public LoginDao ld = new LoginOracle();
	
	public void login(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		String username = req.getParameter("user");
		String password = req.getParameter("pass");
		user login = ld.login(username, password);
		if(login == null) {
			resp.sendRedirect("/FrontController/static/index.html");
		} else if(login.getUser_type().compareToIgnoreCase("User") == 0) {
			HttpSession session = req.getSession();
			session.setAttribute("user", login);
			resp.sendRedirect("/FrontController/static/employeeHomepage.html");
		}
		else if(login.getUser_type().compareToIgnoreCase("Manager") == 0) {
			HttpSession session = req.getSession();
			session.setAttribute("manager", login);
			resp.sendRedirect("/FrontController/static/managerHomepage.html");
		}
	}
	
	public void getPage(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession();
		if(session.getAttribute("user")==null) {
			req.getRequestDispatcher("static/login.html").forward(req,resp);
		} else {
			resp.sendRedirect("home");
		}
	}
	
	public void logout(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		req.getSession().invalidate();
		//resp.sendRedirect("/FrontController/static/managerHomepage.html");
	}
}
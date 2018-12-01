package com.revature.data;



import com.revature.beans.user;

public interface LoginDao {
	user login(String username, String password);
}

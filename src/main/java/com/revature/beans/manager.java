package com.revature.beans;

public class manager {

	private int manager_id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String user_type = "Manager";
	
	public manager() {
		super();
	}

	public manager(int manager_id, String firstName, String lastName, String email, String password, String user_type) {
		super();
		this.manager_id = manager_id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.user_type = user_type;
	}
	
	public manager(String firstName, String lastName, String email, String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}
	
	public manager(String firstName, String lastName, String email, String password, String user_type) {
		//super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.user_type = user_type;
	}
	
	public manager(int manager_id, String firstName, String lastName, String email, String password) {
		super();
		this.manager_id = manager_id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}
	
	public manager(int manager_id, String firstName, String lastName, String email) {
		super();
		this.manager_id = manager_id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}

	public int getManager_id() {
		return manager_id;
	}

	public void setManager_id(int manager_id) {
		this.manager_id = manager_id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUser_type() {
		return user_type;
	}

	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
		result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
		result = prime * result + manager_id;
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((user_type == null) ? 0 : user_type.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		manager other = (manager) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (firstName == null) {
			if (other.firstName != null)
				return false;
		} else if (!firstName.equals(other.firstName))
			return false;
		if (lastName == null) {
			if (other.lastName != null)
				return false;
		} else if (!lastName.equals(other.lastName))
			return false;
		if (manager_id != other.manager_id)
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (user_type == null) {
			if (other.user_type != null)
				return false;
		} else if (!user_type.equals(other.user_type))
			return false;
		return true;
	}

	/*public String toString() {
		return "The Manager [ID: " + manager_id + ", Firstname: " + firstName + ", Lastname: " + lastName
				+ ", E-Mail: " + email + "]";
	}*/
	
	public String toString() {
		return "The Manager [ID: " + manager_id + ", Firstname: " + firstName + ", Lastname: " + lastName
				+ ", E-Mail: " + email + ", Password: " + password + ", User type: " + user_type + "]";
	}
	
	
	
	
	
}

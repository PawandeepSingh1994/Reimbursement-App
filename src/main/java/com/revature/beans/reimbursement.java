package com.revature.beans;

public class reimbursement {
	
	private int r_id;
	private String r_type;
	private String date_submitted;
	private String date_resolved;
	private String r_description;
	private Double r_amount;
	private String r_status;
	private int r_emp_id;
	private int r_man_id;
	private String r_emp_name;
	private String r_man_name;
	
	public reimbursement() {
		super();
	}
	
	public reimbursement(int r_id, String r_type, String date_submitted, String date_resolved, String r_description, Double r_amount, String r_status, int r_emp_id, int r_man_id,String r_emp_name, String r_man_name) {
		super();
		this.r_id = r_id;
		this.r_type = r_type;
		this.date_submitted = date_submitted;
		this.date_resolved = date_resolved;
		this.r_description = r_description;
		this.r_amount = r_amount;
		this.r_status = r_status;
		this.r_emp_id = r_emp_id;
		this.r_man_id = r_man_id;
		this.r_emp_name = r_emp_name;
		this.r_man_name = r_man_name;
		
	}
	
	public reimbursement(int r_id, int r_man_id) {
		this.r_id = r_id;
		this.r_man_id = r_man_id;
	}

	public int getR_id() {
		return r_id;
	}

	public void setR_id(int r_id) {
		this.r_id = r_id;
	}

	public String getR_type() {
		return r_type;
	}

	public void setR_type(String r_type) {
		this.r_type = r_type;
	}

	public String getR_description() {
		return r_description;
	}

	public void setR_description(String r_description) {
		this.r_description = r_description;
	}

	public Double getR_amount() {
		return r_amount;
	}

	public void setR_amount(Double r_amount) {
		this.r_amount = r_amount;
	}

	public String getR_status() {
		return r_status;
	}

	public void setR_status(String r_status) {
		this.r_status = r_status;
	}

	public int getR_emp_id() {
		return r_emp_id;
	}

	public void setR_emp_id(int r_emp_id) {
		this.r_emp_id = r_emp_id;
	}

	public int getR_man_id() {
		return r_man_id;
	}

	public void setR_man_id(int r_man_id) {
		this.r_man_id = r_man_id;
	}
	

	public String getR_emp_name() {
		return r_emp_name;
	}

	public void setR_emp_name(String r_emp_name) {
		this.r_emp_name = r_emp_name;
	}

	public String getR_man_name() {
		return r_man_name;
	}

	public void setR_man_name(String r_man_name) {
		this.r_man_name = r_man_name;
	}

	public String getDate_submitted() {
		return date_submitted;
	}

	public void setDate_submitted(String date_submitted) {
		this.date_submitted = date_submitted;
	}

	public String getDate_resolved() {
		return date_resolved;
	}

	public void setDate_resolved(String date_resolved) {
		this.date_resolved = date_resolved;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((r_amount == null) ? 0 : r_amount.hashCode());
		result = prime * result + ((r_description == null) ? 0 : r_description.hashCode());
		result = prime * result + r_emp_id;
		result = prime * result + r_id;
		result = prime * result + r_man_id;
		result = prime * result + ((r_status == null) ? 0 : r_status.hashCode());
		result = prime * result + ((r_type == null) ? 0 : r_type.hashCode());
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
		reimbursement other = (reimbursement) obj;
		if (r_amount == null) {
			if (other.r_amount != null)
				return false;
		} else if (!r_amount.equals(other.r_amount))
			return false;
		if (r_description == null) {
			if (other.r_description != null)
				return false;
		} else if (!r_description.equals(other.r_description))
			return false;
		if (r_emp_id != other.r_emp_id)
			return false;
		if (r_id != other.r_id)
			return false;
		if (r_man_id != other.r_man_id)
			return false;
		if (r_status == null) {
			if (other.r_status != null)
				return false;
		} else if (!r_status.equals(other.r_status))
			return false;
		if (r_type == null) {
			if (other.r_type != null)
				return false;
		} else if (!r_type.equals(other.r_type))
			return false;
		return true;
	}

	
	@Override
	public String toString() {
		return "reimbursement [r_id=" + r_id + ", r_type=" + r_type + ", date_submitted=" + date_submitted
				+ ", date_resolved=" + date_resolved + ", r_description=" + r_description + ", r_amount=" + r_amount
				+ ", r_status=" + r_status + ", r_emp_id=" + r_emp_id + ", r_man_id=" + r_man_id + ", r_emp_name=" + r_emp_name + ", r_man_name="
				+ r_man_name + "]";
	}
	
	
	
	
	
	
	
	

}

package com.zhongyi.rest.manager;

import javax.ws.rs.core.Response.Status;

import net.sf.json.JSONObject;

public class ManagerResponse {
	public static final Integer NOT_FOUND = Status.NOT_FOUND.getStatusCode();
	public static final Integer OK = Status.OK.getStatusCode();
	
	public static final String REST_STATUS = "rest_status";
	public static final String REST_RESULT = "rest_result";
	
	public static final String STATUS_SUCCESS = "success";
	public static final String STATUS_ERROR = "error";
	
	public Integer status = 404;
	public String response;
//	public JSONObject entity;
}

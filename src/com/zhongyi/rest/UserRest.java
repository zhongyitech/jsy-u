package com.zhongyi.rest;

import javax.ws.rs.CookieParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import net.sf.json.JSONObject;

import com.zhongyi.rest.manager.ManagerResponse;
import com.zhongyi.rest.manager.UserManager;

@Path("/user")
public class UserRest {
	
    @POST
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(@CookieParam("JSESSIONID") String cookie){
    	ManagerResponse response = UserManager.getInstance().getAll(cookie);
		return Response.ok(response.response).status(response.status).build();
    }
    
    @POST
    @Path("get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(@CookieParam("JSESSIONID") String cookie,
			@FormParam("authority")		@DefaultValue("")	String authority,
			@FormParam("departmentid")	@DefaultValue("")	String department){
    	JSONObject params = new JSONObject();
    	params.put("authority", authority);
    	params.put("departmentid", department);
    	ManagerResponse response = UserManager.getInstance().get(cookie, params);
    	return Response.ok(response.response).status(response.status).build();
    }
}

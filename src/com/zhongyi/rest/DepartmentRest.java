package com.zhongyi.rest;

import javax.ws.rs.CookieParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.zhongyi.rest.manager.DepartmentManager;
import com.zhongyi.rest.manager.ManagerResponse;

@Path("/department")
public class DepartmentRest {
	
    @POST
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(@CookieParam("JSESSIONID") String cookie){
    	ManagerResponse response = DepartmentManager.getInstance().getAll(cookie);
		return Response.ok(response.response).status(response.status).build();
    }
}

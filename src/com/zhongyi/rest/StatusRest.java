package com.zhongyi.rest;

import javax.ws.rs.CookieParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.zhongyi.rest.manager.ManagerResponse;
import com.zhongyi.rest.manager.StatusManager;

@Path("/status")
public class StatusRest {
	@POST
	@Path("get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response get(@CookieParam("JSESSIONID") String cookie,
			@FormParam("type")	@DefaultValue("0")	String type){
		ManagerResponse response = StatusManager.getInstance().get(cookie, type);
		return Response.ok(response.response).status(response.status).build();
	}
}

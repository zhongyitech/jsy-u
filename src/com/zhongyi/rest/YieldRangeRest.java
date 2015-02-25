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
import com.zhongyi.rest.manager.YieldRangeManager;

@Path("/yieldRange")
public class YieldRangeRest {
	@POST
	@Path("getyieldrangebyid")
	@Produces(MediaType.APPLICATION_JSON)
	public Response get(@CookieParam("JSESSIONID") String cookie,
			@FormParam("id")	@DefaultValue("")	String id){
		ManagerResponse response = YieldRangeManager.getInstance().get(cookie, id);
		return Response.ok(response.response).status(response.status).build();
	}
}

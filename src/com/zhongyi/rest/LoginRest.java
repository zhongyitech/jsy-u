package com.zhongyi.rest;

import javax.ws.rs.CookieParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.zhongyi.rest.manager.LoginManager;
import com.zhongyi.rest.manager.ManagerResponse;

@Path("/login")
public class LoginRest {

	@POST
	@Path("login")
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(
			@CookieParam("JSESSIONID") @DefaultValue("") String jsession,
			@FormParam("username") @DefaultValue("") String username,
			@FormParam("password") @DefaultValue("") String password) {
		ManagerResponse response = LoginManager.getInstance().login(jsession, username, password);
		return Response.ok(response.response).status(response.status).build();
	}
	
	@POST
	@Path("logout")
	@Produces(MediaType.APPLICATION_JSON)
	public Response logout(
			@CookieParam("JSESSIONID") @DefaultValue("") String jsession,
			@FormParam("username") @DefaultValue("") String username,
			@FormParam("password") @DefaultValue("") String password) {
		ManagerResponse response = LoginManager.getInstance().logout(jsession);
		return Response.ok(response.response).status(response.status).build();
	}

	@POST
	@Path("user")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUser(@CookieParam("JSESSIONID") @DefaultValue("") String jsession) {
		ManagerResponse response = LoginManager.getInstance().getUser(jsession);
		return Response.ok(response.response).status(response.status).build();
	}
}

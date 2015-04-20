package com.zhongyi.rest;

import com.zhongyi.rest.manager.ItemManager;
import com.zhongyi.rest.manager.ManagerResponse;
import net.sf.json.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/auto")
public class AutoRest {
	
	@POST
	@Path("get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response get(@CookieParam("JSESSIONID") String cookie,
			@FormParam("url")	@DefaultValue("")	String url,
			@FormParam("extraData")	@DefaultValue("{}")	String extraData,
			@FormParam("params")	@DefaultValue("{}")	String params)
	{
		try {
			JSONObject paramsJSON = new JSONObject();
			paramsJSON.put("params", params);
			paramsJSON.put("extraData", extraData);
			ManagerResponse response = ItemManager.getInstance().get(cookie, url, paramsJSON);
			return Response.ok(response.response).status(response.status).build();
		}catch(Exception e){
			e.printStackTrace();
			return Response.status(500).build();
		}
	}
	

}

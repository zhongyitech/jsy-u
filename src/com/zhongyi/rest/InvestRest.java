package com.zhongyi.rest;

import javax.ws.rs.CookieParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import net.sf.json.JSONArray;

import com.zhongyi.rest.manager.InvestManager;
import com.zhongyi.rest.manager.ManagerResponse;

@Path("/invest")
public class InvestRest {
    @POST
    @Path("put")
    @Produces(MediaType.APPLICATION_JSON)
    public Response put(@CookieParam("JSESSIONID") String cookie,
			@FormParam("items")		@DefaultValue("[]")		String items){
    	JSONArray itemsArray = JSONArray.fromObject(items);
    	ManagerResponse response = InvestManager.getInstance().put(cookie, itemsArray);
		return Response.ok(response.response).status(response.status).build();
    }
}

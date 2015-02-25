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
import net.sf.json.JSONObject;

import com.zhongyi.rest.manager.ManagerResponse;
import com.zhongyi.rest.manager.PactManager;

@Path("/pact")
public class PactRest {
	private final String START_DEFAULT = "0";
	private final String SIZE_DEFAULt = "10";

    @POST
    @Path("get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(@CookieParam("JSESSIONID") String cookie,
    		@FormParam("start")			@DefaultValue(START_DEFAULT)	String start, 
			@FormParam("size")			@DefaultValue(SIZE_DEFAULt)		String size,
			@FormParam("keyword")		@DefaultValue("")				String keyword){
    	
    	JSONObject params = new JSONObject();
    	params.put("startposition", start);
    	params.put("pagesize", size);
    	params.put("queryparam", keyword);
    	
    	ManagerResponse response = PactManager.getInstance().get(cookie, params);
		return Response.ok(response.response).status(response.status).build();
    }
    
    @POST
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response put(@CookieParam("JSESSIONID") String cookie){
    	ManagerResponse response = PactManager.getInstance().getAll(cookie);
		return Response.ok(response.response).status(response.status).build();
    }
    
    @POST
    @Path("put")
    @Produces(MediaType.APPLICATION_JSON)
    public Response add(@CookieParam("JSESSIONID") String cookie,
			@FormParam("items")	@DefaultValue("[]")	String items){
    	JSONArray itemsArray = JSONArray.fromObject(items);
    	ManagerResponse response = PactManager.getInstance().put(cookie, itemsArray);
		return Response.ok(response.response).status(response.status).build();
    }
}

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

import com.zhongyi.rest.manager.FundManager;
import com.zhongyi.rest.manager.ManagerResponse;

@Path("/fund")
public class FundRest {
	private final String START_DEFAULT = "0";
	private final String SIZE_DEFAULt = "10";

    @POST
    @Path("get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(@CookieParam("JSESSIONID") String cookie,
    		@FormParam("start")			@DefaultValue(START_DEFAULT)	String start, 
			@FormParam("size")			@DefaultValue(SIZE_DEFAULt)		String size,
			@FormParam("keyword")		@DefaultValue("")				String keyword,
			@FormParam("status")		@DefaultValue("")				String status,
			@FormParam("from")			@DefaultValue("")				String from,
			@FormParam("to")			@DefaultValue("")				String to){
    	
    	JSONObject params = new JSONObject();
    	params.put("startposition", start);
    	params.put("pagesize", size);
    	params.put("keyword", keyword);
    	params.put("status", status);
    	params.put("startsaledate1", from);
    	params.put("startsaledate2", to);
    	ManagerResponse response = FundManager.getInstance().get(cookie, params);
		return Response.ok(response.response).status(response.status).build();
    }
    
    @POST
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response put(@CookieParam("JSESSIONID") String cookie){
    	ManagerResponse response = FundManager.getInstance().getAll(cookie);
		return Response.ok(response.response).status(response.status).build();
    }
    
    @POST
    @Path("put")
    @Produces(MediaType.APPLICATION_JSON)
    public Response put(@CookieParam("JSESSIONID") String cookie,
			@FormParam("funds")	@DefaultValue("[]")	String funds){
    	JSONArray fundArray = JSONArray.fromObject(funds);
    	ManagerResponse response = FundManager.getInstance().put(cookie, fundArray);
    	
		return Response.ok(response.response).status(response.status).build();
    }
}

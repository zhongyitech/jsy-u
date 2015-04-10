package com.zhongyi.rest;

import javax.ws.rs.CookieParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.zhongyi.utils.Util;
import net.sf.json.JSONObject;

import com.zhongyi.rest.manager.ItemManager;
import com.zhongyi.rest.manager.ManagerResponse;

import java.util.Map;

@Path("/item")
public class ItemRest {
	
	@POST
	@Path("get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response get(@CookieParam("JSESSIONID") String cookie,
			@FormParam("url")	@DefaultValue("")	String url,
			@FormParam("params")	@DefaultValue("{}")	String params){
		Map<String,Object> paramMap = Util.parseMap(params);
		ManagerResponse response = ItemManager.getInstance().get(cookie, url, paramMap);
		return Response.ok(response.response).status(response.status).build();
	}
	
	@POST
	@Path("post")
	@Produces(MediaType.APPLICATION_JSON)
	public Response post(@CookieParam("JSESSIONID") String cookie,
			@FormParam("url")		@DefaultValue("")	String url,
			@FormParam("params")	@DefaultValue("{}")	String params,
			@FormParam("entity")	@DefaultValue("{}")	String entity){
		Map<String,Object> paramMap = Util.parseMap(params);
		ManagerResponse response = ItemManager.getInstance().post(cookie, url, paramMap, entity);
		return Response.ok(response.response).status(response.status).build();
	}
	
	@POST
	@Path("put")
	@Produces(MediaType.APPLICATION_JSON)
	public Response put(@CookieParam("JSESSIONID") String cookie,
			@FormParam("url")		@DefaultValue("")	String url,
			@FormParam("params")	@DefaultValue("{}")	String params,
			@FormParam("entity")	@DefaultValue("{}")	String entity){
		Map<String,Object> paramMap = Util.parseMap(params);
		ManagerResponse response = ItemManager.getInstance().put(cookie, url, paramMap, entity);
		return Response.ok(response.response).status(response.status).build();
	}
	
	@POST
	@Path("delete")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@CookieParam("JSESSIONID") String cookie,
			@FormParam("url")		@DefaultValue("")	String url,
			@FormParam("params")	@DefaultValue("{}")	String params){
		Map<String,Object> paramMap = Util.parseMap(params);
		ManagerResponse response = ItemManager.getInstance().delete(cookie, url, paramMap);
		return Response.ok(response.response).status(response.status).build();
	}
}

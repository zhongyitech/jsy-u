package com.zhongyi.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.CookieParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.zhongyi.rest.manager.FileManager;
import com.zhongyi.rest.manager.ManagerResponse;

@Path("/file")
public class FileRest {
	
	@POST
	@Path("upload")
	@Produces(MediaType.APPLICATION_JSON)
	public Response upload(@CookieParam("JSESSIONID") String jsession,
			@Context HttpServletRequest request){
		ManagerResponse response = FileManager.getInstance().upload(jsession, request);
		return Response.ok(response.response).status(response.status).build(); 
	}
	
	@GET
	@Path("download")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response download(@CookieParam("JSESSIONID")	@DefaultValue("") 	String jsession, 
							@QueryParam("path")			@DefaultValue("")	String path) throws FileNotFoundException{
		ManagerResponse response = FileManager.getInstance().download(jsession, path);
		File file = new File(response.response);
		InputStream stream = new FileInputStream(file);
		return Response.ok(stream).status(response.status).build();
	}
}

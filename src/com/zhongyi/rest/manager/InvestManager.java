package com.zhongyi.rest.manager;

import java.util.Map.Entry;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;

public class InvestManager extends Manager{
	private InvestManager(){
		
	}
	
	public static final String KEY_ITEM_KEY = "item-key";
	public static final String KEY_ID = "id";
	public static final String KEY_NUMBER = "indexNum";
	
	public static final String URL_GET = "/api/registerContract/readAllForPage";
	public static final String URL_GET_ALL = "/api/registerContract";
	
	public static final String URL_ADD = "/api/investmentArchives";
	public static final String URL_UPDATE = "/api/registerContract";
	
	private static InvestManager instance;
	
	public static synchronized InvestManager getInstance(){
		if(instance == null){
			instance = new InvestManager();
		}
		return instance;
	}
	
	public ManagerResponse get(String cookie, JSONObject params){
		String url = getServiceURL() + URL_GET;
        return super.get(cookie, url, params);
	}
	
	public ManagerResponse getAll(String cookie){
		JSONObject params = new JSONObject();
		String url = getServiceURL() + URL_GET_ALL;
        return super.get(cookie, url, params);
	}
	
	public ManagerResponse put(String cookie, JSONArray items){
		JSONArray result = new JSONArray();
		Integer restStatus = ManagerResponse.OK;
		for (Object object : items) {
			JSONObject item = (JSONObject)object;
			ManagerResponse response = add(cookie, item);
			restStatus = response.status;
			JSONObject resultJSON = JSONObject.fromObject(response.response);
			if(resultJSON != null){
				item = JSONObject.fromObject(resultJSON.get(ManagerResponse.REST_RESULT));
			}
			if(item!= null){
				result.add(item);
			}
		}
		ManagerResponse response = new ManagerResponse();
		response.status = restStatus;
		
		JSONObject entity = new JSONObject();
		entity.put(ManagerResponse.REST_STATUS, ManagerResponse.STATUS_SUCCESS);
		entity.put(ManagerResponse.REST_RESULT, result);
		response.response = entity.toString();
        return response;
	}
	
	public ManagerResponse add(String cookie, JSONObject item){
		String url = getServiceURL() + URL_ADD;
        return super.post(cookie, url, item);
	}
	
	public ManagerResponse update(String cookie, JSONObject item){
		String url = getServiceURL() + URL_UPDATE;
		JSONObject params = new JSONObject();
		if(item != null){
			params.put(KEY_ID, item.get(KEY_ID));
		}
        return super.put(cookie, url, params, item);
	}
}

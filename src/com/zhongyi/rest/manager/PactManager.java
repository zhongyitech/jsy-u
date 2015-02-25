package com.zhongyi.rest.manager;

import java.util.Map.Entry;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;

public class PactManager extends Manager{
	private PactManager(){
		
	}
	
	public static final String KEY_ITEM_KEY = "item-key";
	public static final String KEY_ID = "id";
	public static final String KEY_NUMBER = "indexNum";
	
	public static final String URL_GET = "/api/registerContract/readAllForPage";
	public static final String URL_GET_ALL = "/api/registerContract";
	
	public static final String URL_ADD = "/api/registerContract";
	public static final String URL_UPDATE = "/api/registerContract";
	
	private static PactManager instance;
	
	public static synchronized PactManager getInstance(){
		if(instance == null){
			instance = new PactManager();
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
			Object number = item.get(KEY_NUMBER);
			Object key  = item.get(KEY_ITEM_KEY);
			
			//没有id或编号则新增
			if(number == null){
				ManagerResponse response = add(cookie, item);
				restStatus = response.status;
				JSONObject resultJSON = JSONObject.fromObject(response.response);
				if(resultJSON != null){
					item = JSONObject.fromObject(resultJSON.get(ManagerResponse.REST_RESULT));
				}
			//有id或编号则更新
			}else{
				ManagerResponse response = update(cookie, item);
				restStatus = response.status;
				JSONObject resultJSON = JSONObject.fromObject(response.response);
				if(resultJSON != null){
					item = JSONObject.fromObject(resultJSON.get(ManagerResponse.REST_RESULT));
				}
			}
			
			if(item != null){
				item.put(KEY_ITEM_KEY, key);
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

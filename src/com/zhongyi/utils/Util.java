package com.zhongyi.utils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * π§æﬂ¿‡
 * Created by William.Wei on 2015/4/10.
 */
public class Util {
    public static String toString(HttpEntity entity){
        try {
            return EntityUtils.toString(entity, CHARSET);
        } catch (Exception e) {
            return null;
        }
    }

    public static StringEntity toEntity(String string){
        try {
            return new StringEntity(string, CHARSET);
        } catch (Exception e) {
            return null;
        }
    }

    public static URI getURI(String url,Map<String,Object> paramMap){
        try {
            URIBuilder uri = new URIBuilder(url);
            uri.addParameters(getParams(paramMap));
            return uri.build();
        } catch (URISyntaxException e) {
            return null;
        }
    }

    public static List<NameValuePair> getParams(Map<String, Object> paramMap){
        List<NameValuePair> params=new ArrayList<>();
        for (Map.Entry<String, Object> entry : paramMap.entrySet()) {
            params.add(new BasicNameValuePair(entry.getKey(),String.valueOf(entry.getValue())));
        }
        return params;
    }

    public static boolean isJSONObject(String string){
        return String.valueOf(string).indexOf("{")==0;
    }

    public static boolean isJSONArray(String string){
        return String.valueOf(string).indexOf("[")==0;
    }

    @SuppressWarnings("unchecked")
    public static <K,V> Map<K,V> parseMap(String params){
        Map<K, V> map = new HashMap<K, V>();
        if(isJSONObject(params)) map = (Map<K, V>)JSONObject.fromObject(params);
        return map;
    }

    @SuppressWarnings("unchecked")
    public static <T> List<T> parseList(String params){
        List<T> list = new ArrayList<T>();
        if(isJSONArray(params)) list = (List<T>) JSONArray.fromObject(params);
        return list;
    }

    private static final String CHARSET = "UTF-8";
}

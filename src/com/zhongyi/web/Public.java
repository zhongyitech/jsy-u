package com.zhongyi.web;

import com.zhongyi.rest.manager.TokenManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by William.Wei on 2015/3/26.
 */
@Controller
@RequestMapping("*")
public class Public {
    @RequestMapping(value = "*", method = RequestMethod.GET)
    public void moduleAndAction(HttpServletRequest request,HttpServletResponse response,@CookieValue(value="JSESSIONID", defaultValue="") String token) throws IOException {
        String path = request.getContextPath();
        if (TokenManager.getInstance().get(token) == null) {
            response.sendRedirect(path+"/web/login");
        }else{
            response.sendRedirect(path+"/web/fund");
        }
    }
}

package com.zhongyi.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by William.Wei on 2015/3/26.
 */
@Controller
@RequestMapping("/web")
public class Mapping{
    @RequestMapping(value = "/{module}/{action}", method = RequestMethod.GET)
    public String moduleAndAction(@PathVariable("module") String module,@PathVariable("action") String action) {
        return module+"-"+action;
    }
    @RequestMapping(value = "/{module}", method = RequestMethod.GET)
    public String moduleAndAction(@PathVariable("module") String module) {
        if("login".equalsIgnoreCase(module)){
            return module.toLowerCase();
        }
        return module+"-"+"list";
    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.karvy.Action;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import javax.servlet.http.HttpSession;
import org.apache.struts.actions.DispatchAction;
import com.karvy.BD.services;
import com.karvy.DAO.servicesDAO;
import com.karvy.container.container;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author harshvardhan.solanki
 */
public class dataAction extends DispatchAction {

    public ActionForward getLoginValidation(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
        response.setHeader("cache-control", "no-cache");
        HttpSession httpSession = request.getSession();
        String user = "";
        String Password = "";
        String District = "";
        if (request.getParameter("user") != null) {
            user = request.getParameter("user");
        }
        if (request.getParameter("password") != null) {
            Password = request.getParameter("password");
        }
        if (request.getParameter("District") != null) {
            District = request.getParameter("District");
        }
        servicesDAO dAO = new servicesDAO();
        String data = dAO.getLoginValidation(user, Password, District,request);
        
        PrintWriter out = response.getWriter();
        out.println(data);
        out.flush();
        return null;
    }
   
    public ActionForward getWelcomeData(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
    HttpSession httpSession = request.getSession(false);
    String user =  httpSession.getAttribute("user").toString();
    container container =  (container) httpSession.getAttribute("container");
    String data = "";
    HashMap<String,String> map = new HashMap<String,String>();
    map.put("user", user);
    map.put("district", container.getDistrict().toString());
    Gson gson = new Gson();
    Type tokenType = new TypeToken<Map<String,String>>(){
    }.getType();
    data = gson.toJson(map,tokenType);
    PrintWriter out = response.getWriter();
        out.println(data);
        out.flush();
        return null;
    
    }
    
   public ActionForward getBlockData(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception { 
   HttpSession httpSession = request.getSession(false);
   String user = "";
   String district = "";
   String queryFlag = "";
   if(request.getParameter("user")!=null){
   user = request.getParameter("user");
   }
   if(request.getParameter("district")!=null){
   district = request.getParameter("district");
   }
   if(request.getParameter("queryFlag")!=null){
   queryFlag = request.getParameter("queryFlag");
   }
   servicesDAO dAO = new servicesDAO();
   String data = dAO.getBlockData(user,district,queryFlag);
    
    PrintWriter out = response.getWriter();
        out.println(data);
        out.flush();
        return null;
   }
   public ActionForward getProjectLevelData(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception { 
   HttpSession httpSession = request.getSession(false);
   String filter ="";
   String queryFlag = "";
   LinkedHashMap<String,String> filterData = new LinkedHashMap<>();
   if(request.getParameter("filter")!=null){
   filter = request.getParameter("filter");
   
   Type tokenType = new TypeToken<Map<String,String>>() {
        }.getType();
   Gson gson = new Gson();
    filterData = gson.fromJson(filter, tokenType);
   }
   if(request.getParameter("queryFlag")!=null){
   queryFlag = request.getParameter("queryFlag");
   }
   servicesDAO dAO = new servicesDAO();
   String data = dAO.getProjectLevelData(filterData,queryFlag);
    
    PrintWriter out = response.getWriter();
        out.println(data);
        out.flush();
        return null;
   }

   public ActionForward setInsertLevelData(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception { 
   String data = "Data entered successfully ";
   String insertDataMap = "";
   String tableFlag = "";
   Gson gson = new Gson();
   LinkedHashMap<String,String> neutritionInsertData = new LinkedHashMap<>();
   if(request.getParameter("insertData")!=null){
   insertDataMap = request.getParameter("insertData");
   Type tokenType = new TypeToken<Map<String,String>>() {
        }.getType();
   neutritionInsertData = gson.fromJson(insertDataMap, tokenType);
   }
   if(request.getParameter("tableFlag")!=null){
   tableFlag = request.getParameter("tableFlag");
  }
   servicesDAO dAO = new servicesDAO();
   dAO.setInsertLevelData(neutritionInsertData,tableFlag);
   
   PrintWriter out = response.getWriter();
        out.println(data);
        out.flush();
        return null;    
   }
   
   public ActionForward logout(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
       response.setHeader("cache-control", "no-cache");
       HttpSession session = request.getSession(false);
        if(session!=null){
    session.invalidate();
        }
       String data = "";
     PrintWriter out = response.getWriter();
        out.println(data);
        out.flush();
        return null;    
}
}

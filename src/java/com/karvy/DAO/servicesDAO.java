/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.karvy.DAO;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import com.karvy.BD.services;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.karvy.container.container;
import java.io.IOException;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.TreeMap;
import static javafx.scene.input.KeyCode.T;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import sun.security.util.Password;
/**
 *
 * @author harshvardhan.solanki
 */
public class servicesDAO {
  

//public Map<String,String> properties(String properties) throws ClassNotFoundException, SQLException{
//Gson gson = new Gson();
//Type propertiestype= new TypeToken<Map<String,List<String>>>(){}.getType();
//Map<String,List<String>>propertiesMap = gson.fromJson(properties, propertiestype);
//Map<String,String> returnMap = new HashMap<>();
//if(propertiesMap!=null){
//Iterator<Map.Entry<String, List<String>>> entries = propertiesMap.entrySet().iterator(); 
//while (entries.hasNext()) { 
//Map.Entry<String, List<String>> entry = entries.next();
//if(entry.getValue().size()>0){
//returnMap.put(entry.getKey(), entry.getValue().get(0));
//}
//}
//}
//
//return returnMap;
//}

public String getLoginValidation(String user, String Password, String District,HttpServletRequest request) throws ClassNotFoundException, SQLException, IOException {
        List<Map<String, String>> data = new ArrayList<>();
        Gson gson = new Gson();
        services service = new services();
        LinkedHashMap<String, String> Parameter = new LinkedHashMap<>();
        Parameter.put("user", user);
        Parameter.put("Password", Password);
        Parameter.put("District", District);
        String query = "loginValidation";
        service.getLoginValidation(Parameter,request,query);
        HttpSession session = request.getSession(false);
        container container = (container) session.getAttribute("container");
        data = container.getResultSetData();
        for(int i=0;i<data.size();i++){
            Iterator iterator = data.get(i).entrySet().iterator();
            while(iterator.hasNext()){
            Map.Entry pair = (Map.Entry)iterator.next();
            if(pair.getKey().toString().equalsIgnoreCase("District")){
            container.setDistrict(pair.getValue().toString());
            session.setAttribute("container", container);
            }
            else if(pair.getKey().toString().equalsIgnoreCase("User ID")){
            session.setAttribute("user",pair.getValue());
            }
            }
        }
        Type tokenType = new TypeToken<List<Map<String, String>>>() {
        }.getType();
        String returnData = gson.toJson(data, tokenType);
        return returnData;
    }

public String getBlockData(String user, String district,String queryFlag) throws ClassNotFoundException, SQLException {
        services service = new services();
        Gson gson = new Gson();
        List<Map<String,String>> data =  service.getBlockData(user,district,queryFlag);
        Type tokenType = new TypeToken<List<Map<String, String>>>() {
        }.getType();
        String returnData = gson.toJson(data, tokenType);
        return returnData;
        }
public String getProjectLevelData(LinkedHashMap<String,String> filter,String queryFlag) throws ClassNotFoundException, SQLException {
        services service = new services();
        Gson gson = new Gson();
        List<Map<String,String>> data =  service.getProjectLevelData(filter,queryFlag);
        Type tokenType = new TypeToken<List<Map<String, String>>>() {
        }.getType();
        String returnData = gson.toJson(data, tokenType);
        return returnData;
        }

public String setInsertLevelData(LinkedHashMap<String,String> neutritionInsertData,String tableFlag) throws ClassNotFoundException, SQLException{
        services service = new services();
        Gson gson = new Gson();
        List<Map<String,String>> data = service.setInsertLevelData(neutritionInsertData,tableFlag);

        return null;
}
}
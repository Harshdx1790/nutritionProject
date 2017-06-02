/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.karvy.BD;

/**
 *
 * @author harshvardhan.solanki
 */
import com.karvy.container.container;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.TreeMap;
import static javafx.scene.input.KeyCode.T;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
public class services {
  
  
   
  public List getLoginValidation(LinkedHashMap<String,String>parameter,HttpServletRequest request,String queryFlag)throws ClassNotFoundException, SQLException, FileNotFoundException, IOException{
      
     
     queryProcessing processing = new queryProcessing();
     String query = processing.getQueries(queryFlag);
     HashMap<String,String> Connection = processing.getConnectionDetails();
     Class.forName(Connection.get("driver"));
     Connection con = DriverManager.getConnection(Connection.get("connection")+"/"+Connection.get("dataBase"),Connection.get("userName"),Connection.get("password"));
     List<Map<String,String>> data = new ArrayList<Map<String,String>>();
     PreparedStatement ps = con.prepareStatement(query);
     Iterator it = parameter.entrySet().iterator();
     int count =1;
     while (it.hasNext()) {
         Map.Entry pair = (Map.Entry)it.next();
         ps.setString(count,  pair.getValue().toString());
         count++;
         it.remove();
     }
     ResultSet rs = ps.executeQuery();
     ResultSetMetaData rsmd = rs.getMetaData();
     List<String> columns = new ArrayList<String>(rsmd.getColumnCount());
        for(int i = 1; i <= rsmd.getColumnCount(); i++){
        columns.add(rsmd.getColumnName(i));
        }
    while(rs.next()){
    Map<String,String> row = new HashMap<String, String>(columns.size());
    for(String col : columns) {
            row.put(col, rs.getString(col));
         }
    data.add(row);
    }
    container container = new container();
    container.setResultSetData(data);
    HttpSession session = request.getSession(false);
    session.setAttribute("container", container);
    rs.close();
    ps.close();
    con.close();
    return null;
  }
  
  public List getBlockData(String user,String district,String queryFlag) throws ClassNotFoundException, SQLException{
  queryProcessing processing = new queryProcessing();
  String query = processing.getQueries(queryFlag);
  HashMap<String,String> Connection = processing.getConnectionDetails();
  Class.forName(Connection.get("driver"));
  Connection con = DriverManager.getConnection(Connection.get("connection")+"/"+Connection.get("dataBase"),Connection.get("userName"),Connection.get("password"));
  List<Map<String,String>> data = new ArrayList<Map<String,String>>();
  PreparedStatement ps = con.prepareStatement(query);
  ps.setString(1, district);
  ResultSet rs = ps.executeQuery();
  ResultSetMetaData rsmd = rs.getMetaData();
  List<String> columns = new ArrayList<String>(rsmd.getColumnCount());
        for(int i = 1; i <= rsmd.getColumnCount(); i++){
        columns.add(rsmd.getColumnName(i));
        }
  while(rs.next()){
    Map<String,String> row = new HashMap<String, String>(columns.size());
    for(String col : columns) {
            row.put(col, rs.getString(col));
         }
    data.add(row);
    }      
  return data; 
  }
  public List getProjectLevelData(LinkedHashMap<String,String> filter,String queryFlag) throws ClassNotFoundException, SQLException{
  queryProcessing processing = new queryProcessing();
  String query = processing.getQueries(queryFlag);
  HashMap<String,String> Connection = processing.getConnectionDetails();
  Class.forName(Connection.get("driver"));
  Connection con = DriverManager.getConnection(Connection.get("connection")+"/"+Connection.get("dataBase"),Connection.get("userName"),Connection.get("password"));
  List<Map<String,String>> data = new ArrayList<Map<String,String>>();
  PreparedStatement ps = con.prepareStatement(query);
  Iterator it = filter.entrySet().iterator();
     int count =1;
     while (it.hasNext()) {
         Map.Entry pair = (Map.Entry)it.next();
         ps.setString(count,  pair.getValue().toString());
         count++;
         it.remove();
     }
  ResultSet rs = ps.executeQuery();
  ResultSetMetaData rsmd = rs.getMetaData();
  List<String> columns = new ArrayList<String>(rsmd.getColumnCount());
        for(int i = 1; i <= rsmd.getColumnCount(); i++){
        columns.add(rsmd.getColumnName(i));
        }
  while(rs.next()){
    Map<String,String> row = new HashMap<String, String>(columns.size());
    for(String col : columns) {
            row.put(col, rs.getString(col));
         }
    data.add(row);
    }      
  return data; 
  }
  
 public List setInsertLevelData(LinkedHashMap<String,String> neutritionInsertData,String tableName) throws ClassNotFoundException, SQLException {
    queryProcessing processing = new queryProcessing();
    HashMap<String,String> Connection = processing.getConnectionDetails();
    Class.forName(Connection.get("driver"));
    Connection con = DriverManager.getConnection(Connection.get("connection")+"/"+Connection.get("dataBase"),Connection.get("userName"),Connection.get("password"));
    List<Map<String,String>> data = new ArrayList<Map<String,String>>();
    StringBuilder sb = new StringBuilder();
    sb.append("insert into ");
    sb.append(tableName);
    sb.append(" values (");
    Iterator it = neutritionInsertData.entrySet().iterator();
    while(it.hasNext()){
    Map.Entry pair = (Map.Entry)it.next();
    if(pair.getKey().toString().equalsIgnoreCase("datePicker")){
    sb.append("'");
    sb.append(pair.getValue().toString());
    sb.append("'");
    sb.append(" ");
    }else {
    sb.append("'");
    sb.append(pair.getValue().toString());
    sb.append("'");
    sb.append(",");
    }
    }
    sb.append(")");
    PreparedStatement ps = con.prepareStatement(sb.toString());
    ps.executeUpdate();
    ps.close();
    con.close();
//    StringBuilder sb1 = new StringBuilder();
//    sb1.append("insert into nutrition_village_data values (");
//    Iterator it1 = neutritionInsertData.entrySet().iterator();
//    while(it1.hasNext()){
//    Map.Entry pair1 = (Map.Entry)it1.next();
//    if(pair1.getKey().toString().equalsIgnoreCase("district") || pair1.getKey().toString().equalsIgnoreCase("block")|| pair1.getKey().toString().equalsIgnoreCase("Village") || pair1.getKey().toString().equalsIgnoreCase("villageAssemblyName") || pair1.getKey().toString().equalsIgnoreCase("villageHeadName")||pair1.getKey().toString().equalsIgnoreCase("villageHeadMobile") || pair1.getKey().toString().equalsIgnoreCase("awwName") || pair1.getKey().toString().equalsIgnoreCase("awwMobile")|| pair1.getKey().toString().equalsIgnoreCase("ServantName") || pair1.getKey().toString().equalsIgnoreCase("Servantmobile") || pair1.getKey().toString().equalsIgnoreCase("datePicker")||pair1.getKey().toString().equalsIgnoreCase("Place")|| pair1.getKey().toString().equalsIgnoreCase("subcenter")){
//    sb1.append("'");
//    sb1.append(pair1.getValue().toString());
//    sb1.append("'");
//    sb1.append(",");
//    }else if(pair1.getKey().toString().equalsIgnoreCase("datePicker")){
//    sb1.append("'");
//    sb1.append(pair1.getValue().toString());
//    sb1.append("'");
//    sb1.append(" ");
//    }
//    }
//    sb1.append(")");
//    PreparedStatement ps1 = con.prepareStatement(sb1.toString());
//    ps1.executeUpdate();
    
    
  return data; 
    
 } 
  
}

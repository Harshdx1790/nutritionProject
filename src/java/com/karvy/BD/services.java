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
import com.karvy.connectionPool.connectionPool;
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
  
    connectionPool connPool= null;
    Connection conn = null;
   
  public List getLoginValidation(LinkedHashMap<String,String>parameter,HttpServletRequest request,String queryFlag)throws ClassNotFoundException, SQLException, FileNotFoundException, IOException{
      
     
     queryProcessing processing = new queryProcessing();
     String query = processing.getQueries(queryFlag);
     try{
     if(connPool== null){
     connPool = connectionPool.getInstance();
     connPool.initialize();
     }
     conn = connPool.getConnection();
     List<Map<String,String>> data = new ArrayList<Map<String,String>>();
     PreparedStatement ps = conn.prepareStatement(query);
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
    conn.close();
     } 
     catch(Exception ex){
    ex.printStackTrace();
    }
    finally {
            connPool.putConnection(conn);
        }
   return null;
  }
  
  public List getBlockData(String user,String district,String queryFlag) throws ClassNotFoundException, SQLException{
  queryProcessing processing = new queryProcessing();
  String query = processing.getQueries(queryFlag);
  HashMap<String,String> Connection = processing.getConnectionDetails();
  List<Map<String,String>> data = new ArrayList<Map<String,String>>();
  try {
  if(connPool== null){
     connPool = connectionPool.getInstance();
     connPool.initialize();
     }
     conn = connPool.getConnection();
     
  PreparedStatement ps = conn.prepareStatement(query);
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
  } 
     catch(Exception ex){
    ex.printStackTrace();
    }
    finally {
            connPool.putConnection(conn);
        }
  return data; 
  }
  
  public List getProjectLevelData(LinkedHashMap<String,String> filter,String queryFlag) throws ClassNotFoundException, SQLException{
  queryProcessing processing = new queryProcessing();
  String query = processing.getQueries(queryFlag);
  List<Map<String,String>> data = new ArrayList<Map<String,String>>();
  try{
      if(connPool== null){
     connPool = connectionPool.getInstance();
     connPool.initialize();
     }
     conn = connPool.getConnection();
     PreparedStatement ps = conn.prepareStatement(query);
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
  }
   catch(Exception ex){
    ex.printStackTrace();
    }
    finally {
            connPool.putConnection(conn);
        }
  return data; 
  }
  
 public List setInsertLevelData(LinkedHashMap<String,String> neutritionInsertData,String tableName) throws ClassNotFoundException, SQLException {
    queryProcessing processing = new queryProcessing();
    List<Map<String,String>> data = new ArrayList<Map<String,String>>();
    HashMap<String,String> Connection = processing.getConnectionDetails();
    try{
    if(connPool== null){
     connPool = connectionPool.getInstance();
     connPool.initialize();
     }
     conn = connPool.getConnection();
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
    PreparedStatement ps = conn.prepareStatement(sb.toString());
    ps.executeUpdate();
    ps.close();
    conn.close();
    }
     catch(Exception ex){
    ex.printStackTrace();
    }
    finally {
            connPool.putConnection(conn);
        }
  return data; 
    
 } 
  
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.karvy.connectionPool;

/**
 *
 * @author harshvardhan.solanki
 */

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;


public class connectionPool {
  static ArrayList<Connection> connections = null;
 static connectionPool instance = null;

public synchronized void RemoveAllConnection(){
        try{
        if(connections==null){
        return;
        }
        int connSize = connections.size();
        for(int i=0;i<connSize;i++){
        Connection conn = connections.get(i);
        conn.close();
        }
        connections.clear();
        connections = null;
        }
catch(SQLException ex){
System.out.println(ex);
}
}
public static synchronized connectionPool getInstance(){
        if(instance == null){
        instance = new connectionPool();
        }
        return instance;
        }

public synchronized void initialize(){
if(connections==null){
try{
        Properties properties = new Properties();
        InputStream IStream = getClass().getResourceAsStream("/com/karvy/properties/dbProperties.properties");
        properties.load(IStream);
        String DBUsrename = properties.getProperty("userName");
        String DBPassword = properties.getProperty("password");
        String DBUrl = properties.getProperty("connection");
        int maxConnection = Integer.parseInt(properties.getProperty("maxconnections"));
        Class.forName(properties.getProperty("driver")).newInstance();
        connections = new ArrayList<Connection>();
        int count=0;
        while(count<maxConnection){
        Connection conn = DriverManager.getConnection(DBUrl,DBUsrename,DBPassword);
        connections.add(conn);
        count++;
        }System.out.println("connected");
}
catch(Exception e){
System.out.println("cannot connect to database server");
}
}
}
public synchronized Connection getConnection(){
        Connection conn = null;
        if(connections==null){
        return null;
        }
        while (true){
        if(connections.size()>0){
        conn= connections.get(0);
        connections.remove(0);
        break;
        }
        else{
        try{
        wait();
        }catch (Exception ex){
        System.out.println("wait");
        }
        }
        }
        return conn;
}
public synchronized void putConnection(Connection conn) {
        connections.add(conn);
        notifyAll();
    }
public static void main(String[] args){
        connectionPool conn = new connectionPool();
        conn.initialize();
}  
}

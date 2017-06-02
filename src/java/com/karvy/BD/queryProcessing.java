/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.karvy.BD;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Properties;

/**
 *
 * @author harshvardhan.solanki
 */
public class queryProcessing {
 
    public String getQueries(String queryFlag) {
        String query = "";
        Properties prop = new Properties();
        InputStream input = null;
        try {
//          input = new FileInputStream("neutritionQueryResourceBundle.properties");
            input = getClass().getResourceAsStream("/com/karvy/properties/neutritionQueryResourceBundle.properties");
            prop.load(input);
//            System.out.println(prop.getProperty("loginValidation"));
            query = prop.getProperty(queryFlag);
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return query;
    }
    public HashMap<String,String> getConnectionDetails() {
        HashMap<String,String> connection=new HashMap<String,String>(); 
        Properties prop = new Properties();
        InputStream input = null;
        try {
//          input = new FileInputStream("neutritionQueryResourceBundle.properties");
            input = getClass().getResourceAsStream("/com/karvy/properties/dbProperties.properties");
            prop.load(input);
            connection.put("connection", prop.getProperty("connection"));
            connection.put("dataBase", prop.getProperty("dataBase"));
            connection.put("driver", prop.getProperty("driver"));
            connection.put("userName", prop.getProperty("userName"));
            connection.put("password", prop.getProperty("password"));
                       
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return connection;
    }

   

    
}

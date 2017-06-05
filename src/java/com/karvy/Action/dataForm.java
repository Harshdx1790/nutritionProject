/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.karvy.Action;

import org.apache.struts.action.ActionForm;
import org.apache.struts.upload.FormFile;

/**
 *
 * @author harshvardhan.solanki
 */
public class dataForm extends ActionForm{
  private FormFile file;
   private String user;
  private String password;

    /**
     * @return the file
     */
    public FormFile getFile() {
        return file;
    }

    /**
     * @param file the file to set
     */
    public void setFile(FormFile file) {
        this.file = file;
    }

    /**
     * @return the user
     */
    public String getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(String user) {
        this.user = user;
    }
   
    /**
     * @return the password
     */
    public String getPassword() {
        return password;
}

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }
   
   
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.karvy.Action;

import org.apache.struts.action.ActionForm;

/**
 *
 * @author harshvardhan.solanki
 */
public class dataForm extends ActionForm{
  private static final long serialVersionUID = 7403728678369985647L;
   private String query;

    /**
     * @return the query
     */
    public String getQuery() {
        return query;
    }

    /**
     * @param query the query to set
     */
    public void setQuery(String query) {
        this.query = query;
    }
   
}

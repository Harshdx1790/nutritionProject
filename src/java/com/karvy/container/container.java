/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.karvy.container;

import java.util.List;
import java.util.Map;

/**
 *
 * @author harshvardhan.solanki
 */
public class container {
    private List<Map<String,String>> resultSetData ;
    private String district ;
    

    /**
     * @return the resultSetData
     */
    public List<Map<String,String>> getResultSetData() {
        return resultSetData;
    }

    /**
     * @param resultSetData the resultSetData to set
     */
    public void setResultSetData(List<Map<String,String>> resultSetData) {
        this.resultSetData = resultSetData;
    }

    /**
     * @return the district
     */
    public String getDistrict() {
        return district;
    }

    /**
     * @param district the district to set
     */
    public void setDistrict(String district) {
        this.district = district;
    }
    
    
}

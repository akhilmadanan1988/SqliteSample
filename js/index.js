/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var para = document.createElement("p");
document.addEventListener("deviceready", onDeviceReady, false);

v
function onDeviceReady() {
  var db = window.sqlitePlugin.openDatabase({name: "DB"});
    
    
 db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS test_table');
        tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

       
        tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
         
            
             var node = document.createTextNode("insertId rowsAffected " + res.rowsAffected + " -- should be 1");
            para.appendChild(node);
            var element = document.getElementById("deviceready");
            element.appendChild(para);

          db.transaction(function(tx) {
            tx.executeSql("select * from test_table;", [], function(tx, res) {
              console.log("res.rows.length: " + res.rows.length + " -- should be 1");
              console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
                
                
            var node = document.createTextNode("res.rows.length: " + res.rows.length + " -- should be 1 and selected items" + res.rows.item(0).data_num);
            para.appendChild(node);
            var element = document.getElementById("deviceready");
            element.appendChild(para);

            });
          });

        }, function(e) {
            
             var node = document.createTextNode("ERROR: " + e.message);
            para.appendChild(node);
            var element = document.getElementById("deviceready");
            element.appendChild(para);
          console.log("ERROR: " + e.message);
        });
      });
    }
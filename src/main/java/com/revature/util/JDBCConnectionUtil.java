
package com.revature.util;
import java.io.IOException;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class JDBCConnectionUtil {

			private static JDBCConnectionUtil cu = null;
			private static Properties prop = new Properties();
			
			private JDBCConnectionUtil() {
				super();
				InputStream dbProps = JDBCConnectionUtil.class.getClassLoader()
						.getResourceAsStream("database.properties");
				try {
					prop.load(dbProps);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			
			public static JDBCConnectionUtil getInstance() {
				if(cu==null)
					cu=new JDBCConnectionUtil();
				return cu;
			}
			
			public static Connection getConnection(){
				Connection conn = null;
				try {
					// We have to register the driver class
					Class.forName(prop.getProperty("driver"));
					conn = DriverManager.getConnection(
							prop.getProperty("url"),
							prop.getProperty("usr"),
							prop.getProperty("pwd"));
				} catch(Exception e) {
					e.printStackTrace();
				}
			
				return conn;
			
			}

}

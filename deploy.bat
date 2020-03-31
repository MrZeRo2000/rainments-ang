CALL buildprod.bat
RMDIR /S /Q D:\prj\apache-tomcat-9.0.24\work\Catalina\localhost\rainments-ang\
RMDIR /S /Q D:\prj\apache-tomcat-9.0.24\webapps\rainments-ang\
XCOPY dist\rainments-ang\*.* D:\prj\apache-tomcat-9.0.24\webapps\rainments-ang\

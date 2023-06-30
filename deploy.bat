IF EXIST "D:\prj\apache-tomcat-10.1.10\" (
  SET TOMCAT_FOLDER=D:\prj\apache-tomcat-10.1.10
) ELSE (
  SET TOMCAT_FOLDER=%USERPROFILE%\prj\apache-tomcat-10.1.10
)
ECHO TOMCAT FOLDER: %TOMCAT_FOLDER%

SET APP_NAME=rainments-ang

CALL buildprod.bat
RMDIR /S /Q %TOMCAT_FOLDER%\work\Catalina\localhost\%APP_NAME%\
RMDIR /S /Q %TOMCAT_FOLDER%\webapps\%APP_NAME%\
XCOPY dist\%APP_NAME%\*.* %TOMCAT_FOLDER%\webapps\%APP_NAME%\ /S
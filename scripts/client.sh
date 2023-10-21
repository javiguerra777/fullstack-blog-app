# runs the client application
if [ $1 == start ]; then
  cd ./client && npm start
fi
echo $1 $2
# installs specific npm package for application and gives the user an option to add it as a dev dependency
if [ $1 == install ]; then
  read -p "Do you want to install as a dev dependency? (y/n) " yn 
  case $yn in 
  	[yY] ) cd ./client && npm install $2 -D;
		exit;;
	[nN] ) cd ./client && npm install $2;
		exit;;
	* ) echo invalid response;;
esac
fi
# Uninstalls specific npm package for application
if [ $1 == remove ]; then
  read -p "Is this package a dev dependency? (y/n) " yn 
  case $yn in 
  	[yY] ) cd ./client && npm uninstall $2 -D;
		exit;;
	[nN] ) cd ./client && npm uninstall $2;
		exit;;
	* ) echo invalid response;;
esac
fi
# runs tests for the client application
if [ $1 == test ]; then 
  cd ./client && npm test
fi
# runs build of the client applicaiton
if [ $1 == build ]; then 
  cd ./client && npm run build
fi
# not recommended to run but this choice is available
if [ $1 == eject ]; then 
  cd ./client && npm run eject
fi
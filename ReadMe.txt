Run the following code to have correct dependencies

--IN the CLIENT Folder--

//to initialize the node package manager:

npm init 

//Setting react to correct version:

npm install --save react@17.0.2 react-dom@17.0.2



//Material Ui dependencies:

npm i @material-ui/icons @material-ui/core

//other dependencies

npm i axios react-router-dom 



--In the Server Folder--

install mongoose, cors and initialize node:

npm init -y
npm i mongoose express cors

install bcrypt and login authentication:

npm install bcrypt jsonwebtoken cookie-parser dotenv
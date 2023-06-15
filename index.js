// server de express
const session = require('express-session');
const express = require('express');
const bcrypt = require('bcrypt');

const path=require('path');

// definiendo el numero de puerto
const port = 3000;

// importando la base de datos de mongo
const db = require('./config/mongoose');

// importando el esquema
const  Task  = require('./models/task');
const  User  = require('./models/users');

// aca se usa express
const app = express();

app.use(express.static(path.join(__dirname, 'views')));



app.use(session({
  secret: 'expo', 
  resave: false,
  saveUninitialized: false
}));
// Basicamente para poder acceder a los datos del formulario por medio de express
app.use(express.urlencoded());


// definiendo el motor de vistas con ejs
app.set('view engine', 'ejs');
app.set('views', './views');


// mostrando la pagina de la app
app.get('/', function(req, res){
  const username = req.session.username;
      Task.find({username: username }, function(err, task){
        if(err){
            console.log('Error al obtener las tareas de la base de datos');
            return;
        }
        return res.render('main', {
          tasks: task
        });
    });
});


// mostrando la pagina de la app
app.get('/home', function(req, res){
  const username = req.session.username;
      Task.find({username: username }, function(err, task){
        if(err){
            console.log('Error al obtener las tareas de la base de datos');
            return;
        }
        return res.render('home', {
          tasks: task
        });
    });
});

// se crea una tarea
app.post('/create-task', function(req, res){
  const username = req.session.username; // Obtener el nombre de usuario desde la sesión    
  Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        username: username
        }, function(err, newtask){
        if(err){console.log('error al crear la tarea', err); return;}
        

   
        return res.redirect('back');

    });
});


// Borrar tareas
app.get('/delete-task', function(req, res){
    // toma el id de la tarea
    var id = req.query;

    // se fija en el número de tareas que se seleccionaron
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // Encuentra y borra las tareas según su id una por una
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('Error al borrar la tarea');
            }
        })
    }
    return res.redirect('back'); 
});


  
// Ruta para la página de Main
app.get('/main', (req, res) => {
  res.render('main');
});

// Ruta para la página de inicio de sesión
app.get('/login', (req, res) => {
    res.render('login');
  });


  // Ruta para la página de registro
app.get('/signin', (req, res) => {
  res.render('signin');
});
  

  // Ruta para manejar el envío del formulario de inicio de sesión
  app.post('/login', async (req, res) => {
    const { 
      username: email, 
      password 
    } = req.body;

    console.log('req.bd', req.body);

    try {
      // Buscar al usuario en la base de datos
      const user = await User.findOne({ 
        email
      });
  
      if (user) {
        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          // Inicio de sesión exitoso
          req.session.username = user.username;

          res.redirect('/home');
        } else {
          // Contraseña incorrecta
         res.send('Contraseña incorrecta');
       
        }
      } else {
        // Usuario no encontrado
        res.send('Usuario no encontrado');
      }
    } catch (error) {
      console.log(error);
      res.send('Ocurrió un error');
    }
  });






// hacer que la aplicación escuche en un puerto
app.listen(port, function(err){
    if(err){
        console.log(`Error al correr el servidor : ${err}`);
    }

    console.log(`El servidor está activo en el puerto : ${port}`);
});




//ingresar un nuevo usuario

// se crea un usuario 
app.post('/create-user', function(req, res) {
    

  bcrypt.hash(req.body.password, 10, function(err, hashedPassword) {
    if (err) {
      console.log('Error al generar el hash de la contraseña:', err);
      return;
    }
  
  User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      lastname: req.body.lastname,
      name:req.body.name
      }, function(err, newuser){
      if(err){console.log('error al crear usuario', err); return;}
      

 
      return res.redirect('back');

  });
});
});



import db from './db.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import UsuarioController from './controllers/UsuarioController.js';

await db.sync({alter:true});

const app = express();
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'ChavesFoiParaAcapuco',
    resave: false,
    saveUninitialized: false
}));

const usuarioController = await new UsuarioController();
app.get('/', usuarioController.renderizarLoginForm);
app.get('/signupForm', usuarioController.renderizarSignupForm);
app.post('/addNovoUsuario', usuarioController.addNovoUsuario);
app.get('/listagemDeUsuarios', usuarioController.renderizarListagemDeUsuarios);
app.post('/login', usuarioController.login);
app.get('/paginaPrincipal', usuarioController.renderizarPaginaPrincipal);
app.get('/veiculosBasicos', usuarioController.renderizarVeiculosBasicos);
app.get('/veiculosMedio', usuarioController.renderizarVeiculosMedio);
app.get('/veiculosLuxo', usuarioController.renderizarVeiculosLuxo);
app.get('/veiculosSuperLuxo', usuarioController.renderizarVeiculosSuperLuxo);

app.listen(3000,() => {
    console.log("Aplicação no ar.");
});
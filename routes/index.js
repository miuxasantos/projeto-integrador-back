import usuarioRouter from './usuarioRouter.js';
import contaRouter from './contaRouter.js';
import movRouter from './movRouter.js';
import metasRouter from './metasRouter.js';
import carteiraInvestRouter from './carteiraInvestRouter.js';
import authRouter from './authRouter.js';
import express from 'express';

function Routers(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/user', usuarioRouter);
    app.use('/conta', contaRouter);
    app.use('/mov', movRouter);
    app.use('/metas', metasRouter);
    app.use('/invest', carteiraInvestRouter);
    app.use('/auth', authRouter);
}

export default Routers; 
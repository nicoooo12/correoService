const express = require('express');
// const boom = require('@hapi/boom');
const passport = require('passport');

const catalogoService = require('../services/catalogos');
const CartonesService = require('../services/cartones');
const OrdenesService = require('../services/ordenes');
const PlayService = require('../services/play');
const eventoService = require('../services/evento');

require('../utils/auth/strategies/jwt');

module.exports = function(app) {
  const router = new express.Router();
  app.use('/api', router);

  router.get('/initialState',
      async (req, res, next)=>{
        try {
          let initialState;
          const vars = await eventoService.get();

          if (req.headers.authorization) {
            await passport.authenticate('jwt',
                {session: false})(req, res, async (e) =>{
              const user = {
                name: req.user.name,
                email: req.user.email,
                id: req.user._id,
              };

              const cartones = await CartonesService
                  .getCarton({user: req.user._id});
              const myInProgressOrden = await OrdenesService
                  .getOrden(req.user._id);
              const myEndsOrden = await OrdenesService
                  .getOrdenTerminadas(req.user._id);
              const catalogo = await catalogoService.getCatalogo();
              const play = await PlayService.getPlay();

              initialState = {
                'user': user,
                'vars': {
                  pago: vars.pago,
                  contacto: vars.contacto,
                  subTitle: vars.subTitle,
                  title: vars.title,
                },
                'redirect': '',
                'cartonesUser': cartones.map((e)=>{
                  return {
                    ...e._doc,
                    play: [
                      [false, false, false, false, false],
                      [false, false, false, false, false],
                      [false, false, false, false, false],
                      [false, false, false, false, false],
                      [false, false, false, false, false],
                    ],
                  };
                }),
                'ordenes': {
                  enProgreso: myInProgressOrden[0] ? myInProgressOrden[0] : {},
                  terminadas: myEndsOrden,
                },
                'catalogos': catalogo,
                'play': play,
                'carrito': {
                  active: false,
                  state: (myInProgressOrden.user ? 1 : 0),
                  data: [],
                },
              };

              console.log(vars, initialState);

              res.json({
                message: 'ok',
                data: initialState,
              }).status(200);
            });
          } else {
            const catalogo = await catalogoService.getCatalogo();
            initialState = {
              'user': {},
              'vars': {
                pago: vars.pago,
                contacto: vars.contacto,
                subTitle: vars.subTitle,
                title: vars.title,
              },
              'redirect': '',
              'cartonesUser': [],
              'ordenes': {
                enProgreso: {},
                terminadas: [],
              },
              'catalogos': catalogo,
              'play': {
                estado: 0,
                serieJuego: 1,
              },
              'carrito': {
                active: false,
                state: 0,
                data: [],
              },
            };

            res.json({
              message: 'ok',
              data: initialState,
            }).status(200);
          }
        } catch (error) {
          throw new Error(error);
        }
      },
  );

  router.get('/getState',
      async (req, res, next)=>{
        try {
          let getState;

          if (req.headers.authorization) {
            await passport.authenticate('jwt',
                {session: false})(req, res, async (e) =>{
              const user = {
                name: req.user.name,
                email: req.user.email,
                id: req.user._id,
              };
              const cartones = await CartonesService
                  .getCarton({user: req.user._id});
              const myInProgressOrden = await OrdenesService
                  .getOrden(req.user._id);
              const myEndsOrden = await OrdenesService
                  .getOrdenTerminadas(req.user._id);
              const play = await PlayService.getPlay();

              getState = {
                'user': user,
                'cartonesUser': cartones.map((e)=>{
                  return {
                    ...e._doc,
                    play: [
                      [false, false, false, false, false],
                      [false, false, false, false, false],
                      [false, false, false, false, false],
                      [false, false, false, false, false],
                      [false, false, false, false, false],
                    ],
                  };
                }),
                'ordenes': {
                  enProgreso: myInProgressOrden[0] ? myInProgressOrden[0] : {},
                  terminadas: myEndsOrden,
                },
                'play': play,
              };

              res.json({
                message: 'ok',
                data: getState,
              }).status(200);
            });
          } else {
            getState = {
              'user': {},
              'redirect': '',
              'cartonesUser': [],
              'ordenes': {
                enProgreso: {},
                terminadas: [],
              },
              'play': {
                estado: 0,
                serieJuego: 1,
              },
            };

            res.json({
              message: 'ok',
              data: getState,
            }).status(200);
          }
        } catch (error) {
          throw new Error(error);
        }
      },
  );
};

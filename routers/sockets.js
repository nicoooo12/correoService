const express = require('express');
// const axios = require('axios');
const PlayService = require('../services/play');

module.exports = function(app, socket) {
  const router = new express.Router();
  app.use('/sockets', router);

  router.post('/updateInfo', async function(req, res, next) {
    // console.log('[id-user Sockets]', (req.params.user).slice(0, 12));
    socket.emit('change');
    res.json({
      message: 'ok',
    });
  });

  router.post('/updateInfo/:user', async function(req, res, next) {
    // console.log('[id-user Sockets]', (req.params.user).slice(0, 12));
    socket.emit([req.params.user]);
    res.json({
      message: 'ok',
    });
  });

  socket.on('connect', (io)=>{
    console.log('connected');
    io.on('ok', async ()=>{
      console.log(io);
      // console.log('ok');
    });
    io.on('admin', ()=>{
      io.join('admin');
    });
    io.on('soyBingo', ()=>{
      io.join('bingo');
    });
    io.on('connectPlay', async ()=>{
      const play = await PlayService.getPlay();
      socket.to(io.id).emit('connected', play.estado, play.serieJuego);
      // socket.to('admin').emit('connectPlay', io.id);
      // socket.to(io.id).emit('connected', 1, 2);
    });
    io.on('play', async (estado, serie)=>{
      await PlayService.updatePlay({estado, serieJuego: serie});
      socket.emit('Play', estado, serie);
      socket.emit('change');
    });
    io.on('Bingo', (user, data, number) => {
      socket.to('admin').emit('play', user, data, number, io.id);
    });
    io.on('ResetAllBingo', ()=>{
      socket.emit('resetAllBingo');
    });
    io.on('Lanzar', (e) => {
      socket.to('bingo').emit('lanzar', e);
    });
    io.on('Init', (e, o) => {
      socket.to('bingo').emit('init', e, o);
    });
    io.on('End', () => {
      socket.to('bingo').emit('end');
    });
    io.on('Reset', () => {
      socket.to('bingo').emit('reset');
    });
    io.on('BingoS', (user) => {
      socket.to('bingo').emit('bingo', user);
    });
    io.on('BingoReject', (e, n) => {
      socket.to(e).emit('bingoReject', n);
      socket.to('bingo').emit('bingoReject');
    });
    io.on('BingoGanador', (user) => {
      socket.to('bingo').emit('bingoGanador', user);
    });
    io.on('Lanzado', (serie, num) => {
      socket.to('admin').emit('lanzado', serie, num);
    });
    io.on('Re-count', () => {
      socket.to('bingo').emit('re-count');
    });
    io.on('Reject', (id) => {
      socket.to(id).to('bingo').emit('reject', id);
    });
    io.on('GetState', () => {
      socket.to('bingo').emit('getState');
    });
    io.on('ReturnGetState', (data) => {
      socket.to('admin').emit('returnGetState', data);
    });
    io.on('SendState', (data)=>{
      socket.to('bingo').emit('sendState', data);
    });
  });
};

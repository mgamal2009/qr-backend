import {createServer} from 'http';
import {createApp} from './app';
import {Server as IOServer} from 'socket.io';
import {qrService} from './services/qr.service';
import dotenv from 'dotenv';


dotenv.config();


const app = createApp();
const httpServer = createServer(app);


const io = new IOServer(httpServer, {cors: {origin: process.env.FRONTEND_URL || '*'}});
qrService.setSocketServer(io);


io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
// send current QR immediately
  socket.emit('qr:update', {uuid: qrService.getCurrent()});
});


const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
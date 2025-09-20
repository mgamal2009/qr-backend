import {v4 as uuidv4} from 'uuid';
import {Server as IOServer} from 'socket.io';


class QRService {
  currentUUID: string;
  io?: IOServer;


  constructor() {
    this.currentUUID = uuidv4();
    // refresh every 60 seconds
    setInterval(() => this.refresh(), 60_000);
  }


  setSocketServer(io: IOServer) {
    this.io = io;
  }


  refresh() {
    this.currentUUID = uuidv4();
    console.log('QR refreshed', this.currentUUID);
    if (this.io) {
      this.io.emit('qr:update', {uuid: this.currentUUID});
    }
  }


  getCurrent() {
    return this.currentUUID;
  }
}


export const qrService = new QRService();
var sockets;

var Sockets = class Sockets {
  sockets = {}
  constructor(){
    if(!instance){
      instance = this;
    }
  }
  open(route) {
    this.sockets[route] = new Socket(route)
  }
  subscribe(route, handlers){
    if(subscribe[route]){
      //subscribe
      this.sockets[route].subscribe(handlers)
    }else{
      //open and subscribe
      open(route)
      this.sockets[route].subscribe(handlers)
    }
  }
  unsubscribe(handlers){
    if(this.sockets[route]) this.sockets[route].unsubscribe(handlers)
  }
}


var Socket = class Socket {
  _ws = null
  openHandlers = []
  messageHandlers = []
  errorHandlers = []
  closeHandlers = []
  constructor(route) {
    //route example: 'ws://host.com/path'
    this._ws = new WebSocket(route);
    this._ws.onopen = () => {
      // connection opened
      this._ws.send('something'); // send a message
      this.callHandlers(this.openHandlers, null)
    };
    
    this._ws.onmessage = (e) => {
      // a message was received
      console.log(e.data);
      this.callHandlers(this.messageHandlers, e)
    };
    
    this._ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
      this.callHandlers(this.errorHandlers, e)
    };
    
    this._ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
      this.callHandlers(this.closeHandlers, e)
    };
  }
  callHandlers(array, e){
    array.forEach(function(item) {
      item(e);
    });
  }
  filter(array, fn){
    array = array.filter(
      function(item) {
          if (item !== fn) {
              return item;
          }
      }
    );
  }
  subscribe(handlers){
    if(handlers.open)     this.openHandlers.push(handlers.open);
    if(handlers.message)  this.messageHandlers.push(handlers.message);
    if(handlers.error)    this.errorHandlers.push(handlers.error);
    if(handlers.close)    this.closeHandlers.push(handlers.close);
  }
  unsubscribe(handlers){
    if(handlers.open)     this.filter(this.openHandlers, handlers.open);
    if(handlers.message)  this.filter(this.messageHandlers, handlers.message);
    if(handlers.error)    this.filter(this.errorHandlers, handlers.error);
    if(handlers.close)    this.filter(this.closeHandlers, handlers.close);
    
    if(
      this.openHandlers.length == 0 &&
      this.messageHandlers.length == 0 &&
      this.errorHandlers.length == 0 &&
      this.closeHandlers.length == 0
    ) this.close()
  }
  close(code = 1000, reason = "transaction complete"){
    this._ws.close(code, reason)
  }
};
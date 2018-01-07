let instance;

export default class Sockets {
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
    if(this.sockets[route]){
      //subscribe
      this.sockets[route].subscribe(handlers, this.destroySocket(route))
    }else{
      //open and subscribe
      this.open(route) 
      this.sockets[route].subscribe(handlers)
    }
    return this.sockets[route]
  }
  unsubscribe(handlers){
    if(this.sockets[route]) this.sockets[route].unsubscribe(handlers)
  }
  destroySocket(route){
    return function(){
      delete this.sockets[route]
    }
  }
}


var Socket = class Socket {
  ws = null
  openHandlers = []
  messageHandlers = []
  errorHandlers = []
  closeHandlers = []
  destroySocket = null
  constructor(route, destroySocket) {
    //route example: 'ws://host.com/path'
    this.ws = new WebSocket(route);
    this.ws.onopen = () => {
      // connection opened
      //this.ws.send('something'); // send a message
      this.callHandlers(this.openHandlers, null)
    };
    
    this.ws.onmessage = (e) => {
      // a message was received
      //console.log(e.data);
      this.callHandlers(this.messageHandlers, e)
    };
    
    this.ws.onerror = (e) => {
      // an error occurred
      //console.log(e.message);
      this.callHandlers(this.errorHandlers, e)
    };
    
    this.ws.onclose = (e) => {
      // connection closed
      //console.log(e.code, e.reason);
      this.callHandlers(this.closeHandlers, e)
    };

    this.destroySocket = destroySocket
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
    ){
      this.close()
      this.destroySocket()
    } 
  }
  send(message){
    this.ws.send(message)
  }
  close(code = 1000, reason = "transaction complete"){
    this.ws.close(code, reason)
  }
};
let instance;

export default class Fetcher {
  route
  dispatch
  constructor(route, dispatch){
    if(!instance){
      instance = this;
    }
    this.route = route
    this.dispatch = dispatch
  }
  get(path, headers, actionThunk){
    this.operation(path, {
      method: 'GET',
      headers,
    }, actionThunk)
  }
  delete(path, headers, actionThunk){
    this.operation(path, {
      method: 'DELETE',
      headers,
    }, actionThunk)
  }
  post(path, headers, actionThunk, data){
    this.operation(path, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    }, actionThunk)
  }
  put(path, headers, actionThunk, data){
    this.operation(path, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    }, actionThunk)
  }
  operation(path, configuration, actionThunk){
    return fetch(`${this.route}${path}`, configuration)
      .then(res => {
        var responseParsed = JSON.parse(res._bodyInit)
        console.log('result', responseParsed)
        return this.dispatch( actionThunk(responseParsed))
      })
  }
}
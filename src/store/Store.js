import { observable } from 'mobx'

class Store {
  @observable currentId = null
  @observable pageName = ''
  @observable mode = false
  @observable editSource = {}
  //@observable server = 'http://172.18.6.7:5582'
  @observable server = 'http://localhost:5582'  
  setCurrentId (payload) {
    this.currentId = payload
  }
  @observable editWidget = {
  }
}

export default new Store()
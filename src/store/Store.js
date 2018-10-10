import { observable } from 'mobx'

class Store {
  @observable currentId = null
  @observable mode = false
  @observable editSource = {}
  @observable server = 'http://172.18.6.7:5582'
  
  setCurrentId (payload) {
    this.currentId = payload
  }
}

export default new Store()
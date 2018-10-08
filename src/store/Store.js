import { observable } from 'mobx'

class Store {
  @observable currentId = null
  @observable mode = false
  @observable editSource = {}

  setCurrentId (payload) {
    this.currentId = payload
  }
}

export default new Store()
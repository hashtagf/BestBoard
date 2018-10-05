import { observable } from 'mobx'

class Store {
  @observable currentId = null
  @observable mode = false
  @observable editSource = {}
}

export default new Store()
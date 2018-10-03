import { observable } from 'mobx'

class Store {
  @observable currentId = null
  @observable mode = false
}

export default new Store()
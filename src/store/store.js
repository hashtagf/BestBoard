import {observable} from 'mobx'
class Store {
    @observable num = 0
}
export default new Store
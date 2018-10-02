import { observable } from 'mobx'
import MicroGear from 'microgear'

class NETPIEMicrogear {
  @observable APPID = 'SmartOfficeAt418B'
  @observable KEY = 'qTshJZGevHkDRfj'
  @observable SECRET = 'ZkO8T2pbVK9lB8EqCsMpCZE3S'
  @observable SUBSCRIBED = '/#'
  @observable microgear = null

  createDatasource() {
    if (this.APPID != null) {
      this.microgear = MicroGear.create({
        key: this.KEY,
        secret: this.SECRET,
        alias: 'DataSource'
      })
      this.microgear.on('connected', () => this.microgear.subscribe(this.SUBSCRIBED))
      this.microgear.connect(this.APPID)
    }
  }
}



export default new NETPIEMicrogear()
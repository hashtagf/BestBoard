/* eslint no-eval: 0 */
import { observable } from 'mobx'
import MicroGear from 'microgear'

class NETPIEMicrogear {
  @observable APPID = 'SmartOfficeAt418B'
  @observable KEY = 'qTshJZGevHkDRfj'
  @observable SECRET = 'ZkO8T2pbVK9lB8EqCsMpCZE3S'
  @observable SUBSCRIBED = '/#'
  @observable microgear = []

  createDatasource(datasources) {
    datasources.forEach(datasource => {
      this.microgear[datasource._id] = MicroGear.create({
        key: datasource.datasource.key,
        secret: datasource.datasource.secret,
        alias: datasource.datasource.name
      })
      eval(datasource.datasource.jsOncreated)
      this.microgear[datasource._id].connect(datasource.datasource.appID)
      this.microgear[datasource._id].on('connected', () => {
        console.log('Connect NETPIE..', datasource.datasource.name)
        eval(datasource.datasource.jsOnconnect)
        this.microgear[datasource._id].subscribe(datasource.datasource.topic)
      })
      this.microgear[datasource._id].on("error", function(err) {
        console.log("Error: " + err )
      })
      this.microgear[datasource._id].on("closed", function() {
        console.log("Closed")
      })
    })
  }
}



export default new NETPIEMicrogear()
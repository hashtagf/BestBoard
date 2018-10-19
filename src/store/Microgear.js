/* eslint no-eval: 0 */
import { observable } from 'mobx'
import MicroGear from 'microgear'

class NETPIEMicrogear {

  @observable microgear = []
  @observable checkConnect = []
  @observable statusOnline = []
  @observable topics = {}

  createMicrogear(datasources) {
    datasources.forEach((datasource, index) => {
      if (datasource.datasource.appID && datasource.datasource.key && datasource.datasource.secret) {
        this.microgear[datasource._id] = MicroGear.create({
          key: datasource.datasource.key,
          secret: datasource.datasource.secret,
          alias: datasource.datasource.name
        })
        if (!this.checkConnect[datasource._id]) {
          this.checkConnect[datasource._id] = true
          this.microgear[datasource._id].connect(datasource.datasource.appID)
        }
        eval(datasource.datasource.jsOncreated)
        this.microgear[datasource._id].on('connected', () => {
          this.microgear[datasource._id].subscribe(datasource.datasource.topic)
          console.log('Connect NETPIE..', datasource.datasource.name)
          this.statusOnline[datasource._id] = true
          this.topics[datasource._id] = {}
          eval(datasource.datasource.jsOnconnect)
        })
        this.microgear[datasource._id].on("error", function (err) {
          console.log("Error: " + err)
        })
        this.microgear[datasource._id].on("closed", function () {
          console.log("Closed")
        })
        this.microgear[datasource._id].on("message", (topic, msg) => {
          var obj = {
            label: topic,
            value: msg + ''
          }
          this.topics[datasource._id][topic] = obj
        })
      }
      else datasources.splice(index, 1)
    })
  }

  updateMicrogear(datasourceId, datasource) {
    this.microgear[datasourceId] = MicroGear.create({
      key: datasource.key,
      secret: datasource.secret,
      alias: datasource.name
    })
    this.microgear[datasourceId].connect(datasource.appID)
    eval(datasource.jsOncreated)
    this.microgear[datasourceId].on('connected', () => {
      this.microgear[datasourceId].subscribe(datasource.topic)
      console.log('Connect NETPIE..', datasource.name)
      eval(datasource.jsOnconnect)
    })
    this.microgear[datasourceId].on("error", function (err) {
      console.log("Error: " + err)
    })
    this.microgear[datasourceId].on("closed", function () {
      console.log("Closed")
    })
  }

}



export default new NETPIEMicrogear()
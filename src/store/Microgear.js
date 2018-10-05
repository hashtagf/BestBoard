/* eslint no-eval: 0 */
import { observable } from 'mobx'
import MicroGear from 'microgear'

class NETPIEMicrogear {

  @observable microgear = []

  createMicrogear(datasources) {
    datasources.forEach((datasource,index) => {
      if (datasource.datasource.appID&&datasource.datasource.key&&datasource.datasource.secret) {
        this.microgear[datasource._id] = MicroGear.create({
          key: datasource.datasource.key,
          secret: datasource.datasource.secret,
          alias: datasource.datasource.name
        })
        this.microgear[datasource._id].connect(datasource.datasource.appID)
        eval(datasource.datasource.jsOncreated)
        this.microgear[datasource._id].on('connected', () => {
          this.microgear[datasource._id].subscribe(datasource.datasource.topic)
          console.log('Connect NETPIE..', datasource.datasource.name)
          eval(datasource.datasource.jsOnconnect)
        })
        this.microgear[datasource._id].on("error", function(err) {
          console.log("Error: " + err )
        })
        this.microgear[datasource._id].on("closed", function() {
          console.log("Closed")
        })
        
      }
      else datasources.splice(index,1)
    })
  }
     
}



export default new NETPIEMicrogear()
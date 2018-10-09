import { observable } from 'mobx'
import axios from 'axios'
import React from 'react'
import ListDatasource from './ListDatasource'
import config from '../config.js'
//import NETPIEMicrogear from './Microgear'
// import LocalStore from './LocalStore'
class DatasourceStore {
  @observable datasources = null
  @observable server = 'http://172.18.6.7:5582'

  createDatasource (payload) {
    axios.post(config.server + '/datasource/', {
      datasource: payload
    }).then((res) => 
      console.log(res)
    )
    // LocalStore.insertDataSource(payload)
    // NETPIEMicrogear.createMicrogear(LocalStore.local.datasources)
  }

  updateDatasource (datasourceId, payload) {
    axios.put(config.server + '/datasource/' + datasourceId, {datasource : payload}).then((res) => 
      console.log(res)
    )
    // LocalStore.updateDataSource(datasourceId,payload)
  }

  deleteDatasource (datasourceId) {
    axios.delete(config.server + '/datasource/' + datasourceId).then((res) => 
      console.log(res)
    )
    // LocalStore.local.datasources.splice(datasourceId,1)
  }

  listsDatasources () {
    return this.datasources.map((datasource) => 
      <ListDatasource key={datasource._id} datasource={datasource}/>
    )
  }
}

export default new DatasourceStore()
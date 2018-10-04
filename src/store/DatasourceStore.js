import { observable } from 'mobx'
import axios from 'axios'
import React from 'react'
import ListDatasource from './ListDatasource'
import NETPIEMicrogear from './Microgear'
import LocalStore from './LocalStore'
class DatasourceStore {
  @observable datasources = null
  @observable server = 'http://172.18.6.7:5582'

  createDatasource(payload) {
    axios.post(this.server + '/datasource/', {
      datasource: payload
    }).then((res) => 
      console.log(res)
    )
    var obj = {
      _id: LocalStore.local.datasources.length,
      datasource: payload
    }
    LocalStore.local.datasources.push(obj)
    NETPIEMicrogear.createDatasource(LocalStore.local.datasources)
    console.log(LocalStore.local.datasources)
  }

  updateDatasource(datasourceId, payload) {
    axios.put(this.server + '/datasource/' + datasourceId, payload).then((res) => 
      console.log(res)
    )
    LocalStore.local.datasources[datasourceId] = payload
  }

  deleteDatasource(datasourceId) {
    axios.delete(this.server + '/datasource/' + datasourceId).then((res) => 
      console.log(res)
    )
    LocalStore.local.datasources.splice(datasourceId,1)
  }

  listsDatasources() {
    return this.datasources.map((datasource) => 
      <ListDatasource key={datasource._id} datasource={datasource}/>
    )
  }
}

export default new DatasourceStore()
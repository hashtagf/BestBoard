import { observable } from 'mobx'
import axios from 'axios'
import React from 'react'
import ListDatasource from './ListDatasource'

class DatasourceStore {
  @observable datasources = null
  @observable server = 'http://172.18.6.7:5582'

  createDatasource(payload) {
    axios.post(this.server + '/datasource/', {
      datasource: payload
    }).then((res) => 
      console.log(res)
    )
  }

  updateDatasource(datasourceId, payload) {
    axios.put(this.server + '/datasource/' + datasourceId, payload).then((res) => 
      console.log(res)
    )
  }

  deleteDatasource(datasourceId) {
    axios.delete(this.server + '/datasource/' + datasourceId).then((res) => 
      console.log(res)
    )
  }

  listsDatasources() {
    return this.datasources.map((datasource) => 
      <ListDatasource key={datasource._id} datasource={datasource}/>
    )
  }
}

export default new DatasourceStore()
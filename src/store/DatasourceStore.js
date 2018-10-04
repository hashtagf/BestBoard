import { observable } from 'mobx'
import axios from 'axios'

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
}

export default new DatasourceStore()
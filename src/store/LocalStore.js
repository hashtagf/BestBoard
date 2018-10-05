import { observable } from 'mobx'

class LocalStore {
  @observable local = {
    datasources: [
        {   
            _id: 0,
            datasource: {
                typeDatasource: "NETPIE",
                name: "name",
                appID: "smarth",
                key: "2CnqbZKz85LXoRg",
                secret: "aZFoGTdCVtzth1f9OXxV5N63R",
                topic: "/#",
                jsOnconnect: "",
                jsOncreated: ""
            }
        },
        {   
            _id: 1,
            datasource: {
                typeDatasource: "NETPIE",
                name: "418B_Board",
                appID: "SmartOfficeAt418B",
                key: "ej2smdC7pZF8PyR",
                secret: "ZFXns7FxJEqqenSTSfeDHcih3",
                topic: "/#",
                jsOnconnect: "",
                jsOncreated: ""
            }
        }
    ],
    microgear: [
    ],
    listWidgets: [],
    pages: [
        {
            id: 0,
            name: "BoardName"
        }
    ],
    widgets: [
        /* {
            boardId: "01",
            widget: {
                _01:{
                    typeWidget: "CardBox",
                    title: "title",
                    value: "",
                    datasource: "01",
                    unit: "",
                    icon: ""
                }
            }
        } */

    ]
  }
  insertPage (name) {
    this.local.pages.push({
        id: this.local.pages.length,
        name: name
    })
  }
  updatePage (index,id,name) {
    this.local.pages[index] = {
        id: id,
        name: name
    }
  }
  deletePage (index) {
    this.local.pages.splice(index,1)
    console.log(this.local.pages)
  }
  insertDataSource (payload) {
    this.local.datasources.push({
        _id: this.local.datasources.length,
        datasource: payload
    })
  }
  updateDataSource (index,payload) {
    this.local.datasources[index] = {
        _id: index,
        datasource: payload
    }
  }
}

export default new LocalStore()
import { observable } from 'mobx'
//import socketIOClient from 'socket.io-client'
//let server = 'http://172.18.6.7:5582'
//const socket = socketIOClient(server)
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
    pages: [
      {
        id: 0,
        name: "BoardName"
      }
    ],
    widgets: {
      0: {
        boardId: 0,
        widget: {
          datasource: "",
          filter: "/",
          filterIndex: 0,
          icon: "p",
          title: "Card Box",
          typeWidget: "CardBox",
          unit: "p",
          value: ""
        }
      }
    }
  }
  insertPage(name) {
    this.local.pages.push({
      id: this.local.pages.length,
      name: name
    })
  }
  updatePage(index, id, name) {
    this.local.pages[index] = {
      id: id,
      name: name
    }
  }
  deletePage(index) {
    this.local.pages.splice(index, 1)
    console.log(this.local.pages)
  }
  insertDataSource(payload) {
    this.local.datasources.push({
      _id: this.local.datasources.length,
      datasource: payload
    })
  }
  updateDataSource(index, payload) {
    this.local.datasources[index] = {
      _id: index,
      datasource: payload
    }
  }
  insertWidget(id, payload) {
    this.local.widgets[id] = {
      boardId: id,
      widget: payload
    }
  }

}

export default new LocalStore()
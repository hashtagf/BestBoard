import { observable } from 'mobx'

class LocalStore {
  @observable local = {
    datasources: [
        {   
            _id: 0,
            datasource: {
                id: "01",
                typeDatasource: "NETPIE",
                name: "name",
                appID: "smarth",
                key: "2CnqbZKz85LXoRg",
                secret: "aZFoGTdCVtzth1f9OXxV5N63R",
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
            id: '01',
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
}

export default new LocalStore()
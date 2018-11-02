import { observable } from 'mobx'

class Store {
  @observable currentId = ''
  @observable pageName = ''
  @observable mode = false
  @observable editSource = {}
  @observable colorUse
  @observable pages = []
  @observable addPage = false
  // observable server = 'http://172.18.6.7:5582'
  //@observable server = 'http://172.18.3.180:5000'
  @observable server = 'http://localhost:5000'
  //@observable server = 'http://172.18.3.180:5582'  
  @observable editWidget = {
  }
  @observable colorSet = [
    {
      name: 'native',
      colors: ['#2C3849', '#303E4D', '#6698C8', '#FFFFFF', '#425263', '#4A5664', '#4A5664', '#4f5d6d', '#4A5664', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#94E864', '#78AF8F', '0 0rem 1rem rgba(0,0,0,.15)']
    },
    {
      name: 'clean',
      colors: ['#f5f5f5', '#F8F8FA', '#FF8669', '#FFFFFF', '#ececec', '#f5f5f5', '#ffffff', '#ffffff', '#cfcfcf', '#383F45', '#383F45', '#4c555e', '#FF8669', '#FF8669', '0 0rem 1rem rgba(0,0,0,.05)']
    },
    {
      name: 'farm',
      colors: ['#f8f3f0', '#4c4743', '#ffb230', '#c3a279', '#7a7774', '#ed6c44', '#ffffff', '#ffffff', '#5a564e', '#cfc0bb', '#7a8682', '#7a8682', '#ed6c44', '#c3a279', '0 0rem 1rem rgba(122, 77, 26,.15)']
    },
    {
      name: 'water',
      colors: ['#084278', '#f5f3f3', '#0BB1EF', '#66666A', '#dedada', '#e7e4e4', '#094e90', '#094a86', '#d7d7e2', '#66666A', '#FFFFFF', '#66666A', '#00A9EE', '#0BB1EF', '0 0rem 1rem rgba(0,0,0,.15)']
    },
    {
      name: 'forest',
      colors: ['#e7eaef', '#dadfe9', '#01a398', '#FFFFFF', '#c3c8d2', '#45959e', '#c2d2d4', '#bcced0', '#79c476', '#0d3340', '#0d3340', '#0d3340', '#79c476', '#78AF8F', '0 0rem 1rem rgba(0,0,0,.15)']
    },
    {
      name: 'space',
      colors: ['#1F313F', '#355263', '#FDD24E', '#FEFEFE', '#435e6d', '#536c7a', '#536c7a', '#4a606d', '#557486', '#FEFEFE', '#FFFFFF', '#FEFEFE', '#FDD24E', '#fad976', '0 0rem 1rem rgba(0,0,0,.15)']
    },
    {
      name: 'galaxy',
      colors: ['#211942', '#1f1d45', '#2dcdf2', '#FFFFFF', '#322e5a', '#292558', '#241d48', '#241d48', '#24214c', '#FFFFFF', '#FFFFFF', '#FEFEFE', 'linear-gradient(to right, rgba(255,93,177,1) 0%, rgba(239,1,124,1) 100%)', '#b236be', '0 0rem 1rem rgba(255, 0, 200, 0.05)']
    }
  ]
  setPage = () => {
    if (this.currentId !== '' && this.pageName === '') {
      var id = this.currentId
      var found = this.pages.find(function(page) {
        return page.id === id
      });
      if (found) {
        this.pageName = found.name
        this.setColor(found.colorName)
      }
    }
  }
  setColor = (name) => {
    var i = 0
    var id = 0
    this.colorSet.forEach((colors, index) => {
      if (colors.name === name) id = index
    })
    this.colorUse = id
    var colorSet = this.colorSet[id].colors
    document.documentElement.style.setProperty("--themeBGmain", colorSet[i++]);
    document.documentElement.style.setProperty("--themeBGsidebar", colorSet[i++]);
    document.documentElement.style.setProperty("--activeItem", colorSet[i++]);
    document.documentElement.style.setProperty("--activeItemText", colorSet[i++]);
    document.documentElement.style.setProperty("--borderMenusidebar", colorSet[i++]);
    document.documentElement.style.setProperty("--titleSidebar", colorSet[i++]);
    document.documentElement.style.setProperty("--widgetBG", colorSet[i++]);
    document.documentElement.style.setProperty("--widgetheadBG", colorSet[i++]);
    document.documentElement.style.setProperty("--hoverItem", colorSet[i++]);
    document.documentElement.style.setProperty("--textColor", colorSet[i++]);
    document.documentElement.style.setProperty("--textWidgetColor", colorSet[i++]);
    document.documentElement.style.setProperty("--textMute", colorSet[i++]);
    document.documentElement.style.setProperty("--activePresence", colorSet[i++]);
    document.documentElement.style.setProperty("--mentionBadge", colorSet[i++]);
    document.documentElement.style.setProperty("--shadow", colorSet[i++]);
  }
}

export default new Store()
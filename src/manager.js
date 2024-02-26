
class ContextMenuManager {  
  constructor() {
    this.visible = false
    this.container = null
    this.root = null
    
    this.handleBlankClick = this.blankClick.bind(this)
  }    
  blankClick() {
    if (!this.visible) return
    this.clearContextMenu()
  }
  clearContextMenu() {
    if (this.root) {
      this.root.unmount()
    }
    if (this.container) {
      document.body.removeChild(this.container)
    }
    this.root = null
    this.container = null
    this.visible = false
    document.removeEventListener('click', this.handleBlankClick)
  }
  show(root, container) {
    if (this.visible) {
      this.clearContextMenu()
    }  
    this.root = root
    this.container = container  
    this.visible = true
    document.addEventListener('click', this.handleBlankClick) 
  }
}

const ContextMenuManagerProxy = (function() {
  let instance
  return new Proxy(ContextMenuManager, {
    construct(target, args) {
      if (!instance) {
        instance = new target(...args)
      }
      return instance
    }
  })
})()

export default new ContextMenuManagerProxy()
import React, { useRef, useEffect, cloneElement } from 'react'
import { rendeContextMenu } from './render.jsx'
import ContextMenuManager from '@/manager.js'

function handleContextMenu(e, menus, callback, options) {
  e.preventDefault()
  e.stopPropagation()    
  const { clientX, clientY } = e  
  const { root, container } = rendeContextMenu(clientX, clientY, menus, callback, options)
  ContextMenuManager.show(root, container)  
}

export function ReactContextMenu({ children, menus, callback, options }) {
  if (React.Children.count(children) !== 1) {
    throw new Error('ContextMenuEvent component expects exactly one child element.');
  }
  const child = React.Children.only(children)
  const childRef = useRef(null) 

  useEffect(() => {
    return () => {
      ContextMenuManager.clearContextMenu()
    }
  }, [])

  return cloneElement(child, { 
    onContextMenu(e) {
      handleContextMenu(e, menus, callback, options)
    },
    ref: childRef 
  })
}
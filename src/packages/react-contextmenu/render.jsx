import React from 'react'
import { createRoot } from 'react-dom/client'
import { ContextMenu } from '@/packages/contextmenu/index.jsx'

export function rendeContextMenu(x, y, menus, callback, options) {
  options = options || {}  
  const portal = (
    <ContextMenu x={x} y={y} menus={menus} callback={callback} options={options} />
  )
  const container = document.createElement('div');
  document.body.appendChild(container)
  const root = createRoot(container)
  root.render(portal)
  return {
    root,
    container
  }
}
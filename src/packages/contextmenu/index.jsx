import React, { useRef, useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Arrow } from '@/packages/arrow/index.jsx'
import { toClassName, getOffset, findTarget } from '@/utils'
import { useViewport } from '@/utils/use-viewport'
import { useNamespace } from '@/utils/use-namespace'
import { Teleport } from '../teleport/index.jsx'
import ContextMenuManager from '@/manager'

export function ContextMenu(props) {
  const { x, y, menus = [], callback, isSub, subRect = {}, options = {} } = props
  const { vw, vh } = useViewport()
  const menuRef = useRef(null)
  const [menuRect, setMenuRect] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  })
  const [subMenuRect, setSubMenuRect] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  })
  const [visible, setVisible] = useState(false)
  const [hoverIndex, setHoverIndex] = useState('')
  const m_offset = 3
  
  const { contextmenuClass, transition } = options
  const ns = useNamespace('react-contextmenu')
  
  function getMenuRect() {
    if (!menuRef.current) return
    let left = 0
    let top = 0
    const width = menuRef.current.clientWidth
    const height = menuRef.current.clientHeight
    if (isSub) {
      let _left = subRect.left + subRect.width + width - m_offset
      left = _left > vw ? subRect.left - width + m_offset : subRect.left + subRect.width + m_offset
      top = subRect.top + height + m_offset > vh 
        ? subRect.top - height + subRect.height + m_offset 
        : subRect.top - m_offset 
    } else {
      left = x + width + m_offset > vw ? vw - width - m_offset : x + m_offset
      top = y + height + m_offset > vh ? vh - height - m_offset : y + m_offset
    }
    setMenuRect({
      left,
      top,
      width,
      height,
    })
  }
  
  function menuStyle() {
    const { left, top } = menuRect
    return {
      left: `${left}px`,
      top: `${top}px`,
      display: !visible ? 'none' : ''
    }
  }
  
  useEffect(() => {
    setVisible(true)
  }, [])
  
  useEffect(() => {   
    if (visible && menuRef.current) {
      getMenuRect()
    }  
  }, [visible])
  
  useEffect(() => {
    getMenuRect()
  }, [vw, vh])
  
  function onMouseOver(e, index, item, itemIndex) {
    const indexKey = `${index}_${itemIndex}`
    setHoverIndex(indexKey)
    const target = findTarget(e.target, e.currentTarget)
    if (!target) return 
    const { offsetLeft, offsetTop } = target
    const offset = getOffset(target, offsetLeft, offsetTop)
    
    setSubMenuRect({
      left: menuRect.left,
      top: offset.top,
      width: target.clientWidth,
      height: target.clientHeight
    })
  }  
  
  function onItemClick(e, item) {
    callback && callback(item)
    ContextMenuManager.clearContextMenu()
  }
  
  function className() {
    return toClassName({
      [ns.b()]: true,
      [contextmenuClass]: true
    })
  }
  
  function listClassName(item, index, itemIndex) {
    return toClassName({
      [ns.b('item')]: true,
      ['is--hover']: hoverIndex === `${index}_${itemIndex}`
    })
  }
  
  return (
    <Teleport>
      <CSSTransition
        in={visible} 
      	classNames={ transition || ns.b() }
      	timeout={300}
        unmountOnExit
      >
        <div className={className()}
          style={menuStyle()} 
          onClick={e => e.stopPropagation()}
          onContextMenu={e => {
            e.preventDefault();
            e.stopPropagation()
          }}
          ref={menuRef}
        >
          <div className={ns.b('inner')}>
            {menus.map((list, index) => (
              <div className={ns.b('list')} key={index}>
                {list.map((item, itemIndex) => (
                  <div className={listClassName(item, index, itemIndex)} key={item.code}
                    onMouseOver={e => onMouseOver(e, index, item, itemIndex)}
                    onClick={e => onItemClick(e, item)}
                  >
                    <div className={ns.b('icon')}>
                      { item.icon ? <img src={item.icon} /> : null }
                    </div>
                    <div className={ns.b('content')}>
                      <span>{item.name}</span>
                    </div>
                    {(item.children && item.children.length) ? <Arrow className={ns.b('arrow-icon')}></Arrow> : null}
                    {
                      (item.children && item.children.length && hoverIndex === `${index}_${itemIndex}`) 
                        ? <ContextMenu 
                            isSub={true}
                            subRect={subMenuRect}
                            menus={item.children}
                            callback={callback}
                            options={options}
                          ></ContextMenu> 
                        : null
                    }
                  </div>        
                ))}
              </div>
            ))}          
          </div>
          
        </div>
      </CSSTransition>
    </Teleport>        
  )
}
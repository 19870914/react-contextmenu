# react-contextmenu

## Installation
```bash
npm i @yyyymmddhhmmss/react-contextmenu
```

## Usage
```js
import { ReactContextMenu } from '@yyyymmddhhmmss/react-contextmenu'

export default function Home() {
    const menus = [
      [
        { name: '打开', code: 'open', icon: '/logo.svg' },
        { name: '刷新', code: 'refresh' },
      ],
      [
        { 
          name: '新建', 
          code: 'new',
          children: [
            [
              ...new Array(10).fill(null).map((i, idx) => ({name: `文件夹${idx}`,code: `folder${idx}`})),
              {
                name: '新建2', 
                code: 'new2',
                children: [
                  [
                    ...new Array(10).fill(null).map((i, idx) => ({name: `文件夹${idx}`,code: `folder${idx}`}))
                  ]
                ]
              },
            ]
          ]
        },
        { name: '属性', code: 'property', icon: '/next.svg' },
      ]
    ]
    const menus2 = [
      [
        { name: '菜单', code: 'menu' },
      ]
    ]
    
    const options = {
      contextmenuClass: 'custom-contextmenu',
      transition: 'custom-contextmenu',
      transitionTimeout: 600
    }
    
    function callback(item) {
      console.log('callback', item)
    }
    
    return(
      <ReactContextMenu menus={menus} callback={callback}>
        <div className="home" 
          style={{
            padding: '100px',
            background: '#fffaaa',
            textAlign: 'center'
          }}
        >
          <ReactContextMenu menus={menus2} callback={callback} options={options}>
            <span>hello world</span>
          </ReactContextMenu>
        </div>
      </ReactContextMenu>      
    )
}
```
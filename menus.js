chrome.runtime.onInstalled.addListener(function () {
  function onCreated () {
    if (chrome.runtime.lastError) {
      console.log(`Error: ${chrome.runtime.lastError}`)
    }
  }

  chrome.contextMenus.create(
    {
      id: 'red',
      title: chrome.i18n.getMessage('menuItemRed'),
      contexts: ['page', 'editable', 'frame', 'link', 'selection']
    },
    onCreated
  )

  chrome.contextMenus.create(
    {
      id: 'orange',
      title: chrome.i18n.getMessage('menuItemOrange'),
      contexts: ['page', 'editable', 'frame', 'link', 'selection']
    },
    onCreated
  )

  chrome.contextMenus.create(
    {
      id: 'yellow',
      title: chrome.i18n.getMessage('menuItemYellow'),
      contexts: ['page', 'editable', 'frame', 'link', 'selection']
    },
    onCreated
  )

  chrome.contextMenus.create(
    {
      id: 'green',
      title: chrome.i18n.getMessage('menuItemGreen'),
      contexts: ['page', 'editable', 'frame', 'link', 'selection']
    },
    onCreated
  )

  chrome.contextMenus.create(
    {
      id: 'blue',
      title: chrome.i18n.getMessage('menuItemBlue'),
      contexts: ['page', 'editable', 'frame', 'link', 'selection']
    },
    onCreated
  )

  chrome.contextMenus.create(
    {
      id: 'indigo',
      title: chrome.i18n.getMessage('menuItemIndigo'),
      contexts: ['page', 'editable', 'frame', 'link', 'selection']
    },
    onCreated
  )

  chrome.contextMenus.create(
    {
      id: 'purple',
      title: chrome.i18n.getMessage('menuItemPurple'),
      contexts: ['page', 'editable', 'frame', 'link', 'selection']
    },
    onCreated
  )
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const id = info.menuItemId || 'red'
  const text = info.selectionText || ''
  console.log(`${info.menuItemId}:${id}; ${info.selectionText}:${text}`)

  chrome.storage.local.get(
    {
      enable: false
    },
    function (items) {
      if (items.enable === true) {
        chrome.storage.local.set(
          {
            [id]: text
          },
          function () {
            if (chrome.runtime.lastError) {
              console.log(`Error: ${chrome.runtime.lastError}`)
            } else {
              console.log('info set ok')
              chrome.tabs.executeScript({
                file: '/highlight.js',
                allFrames: true
              })
            }
          }
        )
      } else {
        chrome.storage.local.set(
          {
            enable: true
          },
          function () {
            if (chrome.runtime.lastError) {
              console.log(`Error: ${chrome.runtime.lastError}`)
            } else {
              chrome.storage.local.set(
                {
                  [id]: text
                },
                function () {
                  if (chrome.runtime.lastError) {
                    console.log(`Error: ${chrome.runtime.lastError}`)
                  } else {
                    console.log('info set ok')
                    chrome.tabs.executeScript({
                      file: '/highlight.js',
                      allFrames: true
                    })
                  }
                }
              )
            }
          }
        )
      }
    }
  )
})

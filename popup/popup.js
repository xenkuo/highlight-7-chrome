// helper
document.getElementById('logo').onclick = function () {
  console.log('logo btn is clicked')
  chrome.tabs.create(
    {
      url: 'https://github.com/xenkuo/highlight-7-chrome'
    },
    tab => {
      console.log(`Created new tab: ${tab.id}`)
    }
  )
}

window.onload = function () {
  console.log('window onload')

  chrome.storage.local.get(null, function (items) {
    console.log(items)
    document.getElementById('red').value = items.red || ''
    document.getElementById('orange').value = items.orange || ''
    document.getElementById('yellow').value = items.yellow || ''
    document.getElementById('green').value = items.green || ''
    document.getElementById('blue').value = items.blue || ''
    document.getElementById('indigo').value = items.indigo || ''
    document.getElementById('purple').value = items.purple || ''
    document.getElementById('enable').checked = items.enable || false
  })

  chrome.tabs.executeScript({
    file: '/highlight.js',
    allFrames: true
  })
}

window.onchange = function (e) {
  const id = e.target.id
  let value = e.target.value.trim()

  if (id !== 'enable') {
    chrome.storage.local.set(
      {
        [id]: value
      },
      function () {
        if (chrome.runtime.lastError) {
          console.log(`Error: ${chrome.runtime.lastError}`)
        }
      }
    )
  } else {
    value = e.target.checked
    chrome.storage.local.set(
      {
        [id]: value
      },
      function () {
        if (chrome.runtime.lastError) {
          console.log(`Error: ${chrome.runtime.lastError}`)
        }
      }
    )
  }
}

export const onIframeLoad = (iframe) => {
  const styleNodes = document.querySelectorAll('style[data-explainit-style="true"]')
  styleNodes.forEach((el) => {
    iframe.contentDocument.head.appendChild(el)
  })

  iframe.style.height = iframe.contentWindow.document.body.scrollHeight
  console.log(iframe.contentWindow.document.body.scrollHeight)
}

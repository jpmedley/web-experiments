(function() {
  const dataEl = document.querySelector('.data');
  const miniPage = document.querySelector('.page').cloneNode(true);
  const layoutViewport = hyperHTML`<div class="layout"></div>`;
  const viewport = hyperHTML`<div class="view"></div>`;
  const wire = hyperHTML.wire;
  const scroller = document.scrollingElement;
  
  if (!self.visualViewport) {
    dataEl.innerText = 'visualViewport not supported';
    dataEl.style.display = 'block';
    return;
  }
  
  if (new URL(window.location).searchParams.has('debug')) {
    dataEl.style.display = 'block';
  }
  
  miniPage.classList.add('mini');
  miniPage.append(layoutViewport);
  layoutViewport.append(miniPage.querySelector('.fixed'));
  layoutViewport.append(viewport);
  document.body.append(miniPage);

  const viewportProps = [
    'offsetLeft', 'offsetTop', 'pageLeft', 'pageTop',
    'width', 'height', 'scale'
  ];
  
  const windowProps = ['innerHeight', 'innerWidth'];
  
  let pendingUpdate = false;
  
  function update() {
    if (pendingUpdate) return;
    pendingUpdate = true;
    
    requestAnimationFrame(() => {
      pendingUpdate = false;
      
      const left = visualViewport.offsetLeft;
      const top = visualViewport.offsetTop;
      const inverseScale = 1 / visualViewport.scale;

      const miniScale = inverseScale * 0.2;
      const miniWidth = miniPage.offsetWidth * miniScale;
      const miniLeft = -(window.innerWidth - visualViewport.width - visualViewport.offsetLeft);
      const miniTop = top - (Math.max(scroller.scrollTop - 400, 0) * miniScale);

      hyperHTML(dataEl)`
        <h1>visualViewport</h1>
        ${viewportProps.map(prop => wire(viewportProps, ':' + prop)`
          <p>${prop}: ${visualViewport[prop]}</p>
        `)}
        <h1>window</h1>
        ${windowProps.map(prop => wire(windowProps, ':' + prop)`
          <p>${prop}: ${self[prop]}</p>
        `)}
      `;

      dataEl.style.transform = `translate(${left}px, ${top}px) scale(${inverseScale})`;
      miniPage.style.transform = `translate(${miniLeft}px, ${miniTop}px) scale(${miniScale})`;
      layoutViewport.style.width = scroller.clientWidth + 'px';
      layoutViewport.style.height = window.innerHeight + 'px';
      layoutViewport.style.transform = `translate(${scroller.scrollLeft}px, ${scroller.scrollTop}px)`;
      viewport.style.width = visualViewport.width + 'px';
      viewport.style.height = visualViewport.height + 'px';
      viewport.style.transform = `translate(${visualViewport.offsetLeft}px, ${visualViewport.offsetTop}px)`;
    });
  }
  
  update();
  visualViewport.addEventListener('scroll', update);
  visualViewport.addEventListener('resize', update);
  addEventListener('scroll', update);
})();
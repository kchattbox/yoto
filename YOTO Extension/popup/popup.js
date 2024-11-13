const button = document.querySelector("#capture_screen");

//// Inject inject.js using chrome api

const injectScript = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [ "screenCaptureMagic.js" ]
    });
}


//// EVENT LISTENERS

// add a shadow when user hovers over the button
button.addEventListener('mouseover', () => {
    button.classList.add('hovering');
})

// remove shadow when user stops hovering over button
button.addEventListener('mouseout', () => {
    button.classList.remove('hovering');
})

// inject script to start screen capture when the button is clicked
button.addEventListener('click', injectScript);




// catch errors when running the script multiple times
try {
    let run;
} catch (e) {}


run = () => {

    // this function takes an eventlistener object and returns coordinates of the mouse
    const getCoordinates = (e) => { 
        return [e.clientX, e.clientY]
    }

    // this function takes two coordinate points and reorders those points so that
    // the first point is the top left and the second point is the bottom right of the box
    const sortTopLeftBottomRightCoordinates = ([x1, y1], [x2, y2]) => { 
        return [[Math.min(x1, x2), Math.min(y1, y2)], [Math.max(x1, x2), Math.max(y1, y2)]];
    }

    // this funcion draws a box by editing the coordinates and width/height of the passed html element
    const drawBox = (box, [[x1, y1], [x2, y2]]) => { 
        box.style.left = `${x1}px`;
        box.style.top =  `${y1}px`;
        box.style.width = `${x2 - x1}px`;
        box.style.height = `${y2 - y1}px`;
    }

    // this funciton creates the region selector elements
    const createRegionSelectorContainer = () => {  
        // create region select container and box
        const container = document.createElement('div');
        const box = document.createElement('div');

        // add html ids
        container.id = "region-selector-container";
        box.id = "region-selector-box";

        // put box inside of container
        container.appendChild(box);

        return container;
    }

    // this function returns the region selector container
    const getRegionSelectorContainer = () => { 
        return document.querySelector("#region-selector-container");
    }

    // this function returns the region selector box
    const getRegionSelectorBox = () => {
        return document.querySelector("#region-selector-box");
    }

    // this function returns the current styles of the DOMElement so it can be 
    // stored and reset later
    const getDOMStyles = DOMElement => {
        return DOMElement.getAttribute('style');
    }

    // this function prevents the user from interacting with DOM while region selector
    // is running (you should pass the document.body object)
    const removeUserDOMInteraction = DOMElement => {
        DOMElement.style.userSelect = "none";
        DOMElement.style.pointerEvents = "none";
    }

    
    const resetUserDOMInteraction = (DOMElement, originalStyles) => {
        DOMElement.style = originalStyles;
    }

    // this function will be the logic for capturing the screen
    const screenCapture = () => {

    };


    // event listners. these funtions are what actually run the region selector code

    // preinitialize these functions so we don't get problems when trying to remove 
    // the even listeners !! TODO: FIGURE OUT WHATS GOING ON WITH THAT !!
    let updateRegionSelectorBoxEventListenerWrapper;
    let endRegionSelectorEventListenerWrapper;

    const startRegionSelector = (mousedownEvent) => {

        // create region selector container and attach it to the DOM
        const container = createRegionSelectorContainer();
        document.body.appendChild(container);

        // save the current styles of the DOM so we can edit and reset it
        const originalDOMStyles = getDOMStyles(document.body);

        // disable user interaction with the DOM
        removeUserDOMInteraction(document.body);


        const firstCornerCoordinates = getCoordinates(mousedownEvent);
            
            //debug
            // console.log("Mousedown", firstCornerCoordinates);

            // attach region selector container to DOM
            document.body.appendChild(getRegionSelectorContainer());

            // add event handlers to finish up region selection

            updateRegionSelectorBoxEventListenerWrapper = (e) => updateRegionSelectorBox(firstCornerCoordinates, e);
            document.body.addEventListener('mousemove', updateRegionSelectorBoxEventListenerWrapper);

            endRegionSelectorEventListenerWrapper = (e) => endRegionSelector(firstCornerCoordinates, e, originalDOMStyles);
            document.body.addEventListener('mouseup', endRegionSelectorEventListenerWrapper);

    }

    const updateRegionSelectorBox = (firstCornerCoordinates, mousemoveEvent) => {
        const secondCornerCoordinates = getCoordinates(mousemoveEvent);

        //debug
        // console.log("Mousemove", secondCornerCoordinates);

        drawBox(getRegionSelectorBox(), sortTopLeftBottomRightCoordinates(firstCornerCoordinates, secondCornerCoordinates));
    }

    const endRegionSelector = (firstCornerCoordinates, mouseupEvent, originalDOMStyles) => {
        const secondCornerCoordinates = getCoordinates(mouseupEvent);

                //debug
                // console.log("Mouseup", secondCornerCoordinates);

                drawBox(getRegionSelectorBox(), sortTopLeftBottomRightCoordinates(firstCornerCoordinates, secondCornerCoordinates));
                screenCapture(); // does nothing right now

                cleanUpRegionSelector(originalDOMStyles);
    }

    const cleanUpRegionSelector = (originalDOMStyles) => {

        // remove region selector elements from the DOM
        getRegionSelectorContainer().remove()

        // remove event listeners 
        document.body.removeEventListener('mousedown', startRegionSelector);
        document.body.removeEventListener('mousemove', updateRegionSelectorBoxEventListenerWrapper);
        document.body.removeEventListener('mouseup', endRegionSelectorEventListenerWrapper);
        

        // reset orignal DOM styles
        resetUserDOMInteraction(originalDOMStyles);

        // debug
        // console.log("removed event listerners");
        // console.log(startRegionSelector);
        // console.log(updateRegionSelectorBox);
        // console.log(endRegionSelector);
    }

    // begin the region selector
    document.body.addEventListener('mousedown', startRegionSelector);

}
run();


/*
Here is the flow of the program

Add event listener for a mousedown
On mousedown
    create region selector box with appropriate styles
    add event listener for mouse motion
    when the mouse moves 
        redraw region selector
    
    add event listener for mouseup
    on mouseup
        we initiate screen capture
        remove the script
*/
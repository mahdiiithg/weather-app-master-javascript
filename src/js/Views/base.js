// DOM Elements Selector
export const elements = {
    body: document.querySelector('body'),
    container: document.querySelector('.container')
};

// Clear All The UI Elements
export const clearUI = () => {
    elements.container.innerHTML = '';
};

// Render loader to passed element
export const renderLoader = parent => {
    const markup = `
    <div class="loader">
        <div class="one"></div>
        <div class="two"></div>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', markup);
}

// clear loader on specific div
export const clearLoader = parent => {
    const loader = parent.querySelector('.loader')
    parent.removeChild(loader)
}

// Render Error 
export const renderError = (parent , msg) => {
    const markup = `
        <div class="error__message">
            ${msg}
         </div>
    `
    parent.insertAdjacentHTML('afterbegin', markup)
}
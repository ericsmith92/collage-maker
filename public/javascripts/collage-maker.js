import '../sass/style.scss';

import { searchForm, submitSearch } from './modules/search';

import {previewEditor, 
        handleDragStart, 
        handleDragEnd, 
        handleDragOver, 
        handleDrop, 
        handleTouchStart, 
        handleTouchEnd} from './modules/preview';

import {modalCloseBtn, 
        modalNoShow, 
        toggleModal, 
        modifyLocalStorage} from './modules/modal';

import { stitchBtn, postJson } from './modules/stitch';

import { info, toggleInfo } from './modules/info';

const path = window.location.pathname;

if(path === '/'){
    info.addEventListener('click', toggleInfo);
    searchForm.addEventListener('submit', submitSearch);
    modalNoShow.addEventListener('click', modifyLocalStorage);
    modalCloseBtn.addEventListener('click', toggleModal);

    if(localStorage.getItem('noShow') === null){
        toggleModal();
    }
}

if(path === '/preview'){

    previewEditor.addEventListener('dragstart', handleDragStart);
    previewEditor.addEventListener('dragend', handleDragEnd);
    previewEditor.addEventListener('dragover', handleDragOver);
    previewEditor.addEventListener('drop', handleDrop);
    previewEditor.addEventListener('touchstart', handleTouchStart);
    previewEditor.addEventListener('touchend', handleTouchEnd);

    stitchBtn.addEventListener('click', postJson);
}

if(path === '/preview' || path === '/download'){
    document.querySelector('body').classList.add('stacked');
}


modalNoShow.addEventListener('click', modifyLocalStorage);
modalCloseBtn.addEventListener('click', toggleModal);

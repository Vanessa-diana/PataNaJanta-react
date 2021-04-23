import React from 'react';

export const protegeLogin = (itemLocalStorage) => {
        
    if(JSON.parse(localStorage.getItem(itemLocalStorage)) == null){
        let currentURL = window.location.href;
        let domain = currentURL.split("/");

        window.location.replace(domain[0] + '#/home');
        window.location.reload(false);
    }
}
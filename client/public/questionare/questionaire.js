/* eslint-disable no-useless-escape */
/* eslint-disable indent */
// hide elements rather than create edit or destroy it if you want it all in 1 page
'use strict';
import { fat, maintain, tone, keepFit, fitnessGoal, name, formAppend, newHeader, buttonRemove, hideHeader } from './questionareModules.mjs';


function loseFat() {
    fat.addEventListener('click', removeFat);
}

function removeFat() {
    const fatResult = fat.value;
    // local storage
    localStorage.setItem('goal', (fatResult));

    buttonRemove();
    hideHeader();
    formAppend();
}

loseFat();

function loseMaintain() {
    maintain.addEventListener('click', removeMaintain);
}

function removeMaintain() {
    const maintainResult = maintain.value;
    localStorage.setItem('goal', (maintainResult));


    buttonRemove();
    hideHeader();
    formAppend();
}
loseMaintain();

function loseTone() {
    tone.addEventListener('click', removeTone);
}

function removeTone() {
    const toneResult = tone.value;
    localStorage.setItem('goal', (toneResult));

    buttonRemove();
    hideHeader();
    formAppend();
}

loseTone();

function loseKeepFit() {
    keepFit.addEventListener('click', removeKeepFit);
}

function removeKeepFit() {
    const keepFitResult = keepFit.value;
    localStorage.setItem('goal', (keepFitResult));


    buttonRemove();
    hideHeader();
    formAppend();
}

loseKeepFit();


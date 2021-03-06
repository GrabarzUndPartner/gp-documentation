"use strict";

import Feature from '../../panel/Feature';

// Optional Template

import template from './general.hbs';

// Optional CSS

import './general.pcss';

export default Feature.extend({
    tmpl: template,
    wrapperEl: null,
    backgroundEl: null,
    modelConstructor: Feature.prototype.modelConstructor.extend({
        session: {
            wrapperSelector: {
                type: 'string',
                required: false
            },
            rowSelector: {
                type: 'string',
                required: false
            },
            backgroundSelector: {
                type: 'string',
                required: false
            },
            gridWrapper: {
                type: 'boolean',
                required: true
            },
            gridWrapperFluid: {
                type: 'boolean',
                required: true
            },
            gridRow: {
                type: 'boolean',
                required: true
            },
            customBackground: {
                type: 'boolean',
                required: true
            },
            customBackgroundColor: {
                type: 'string',
                required: false
            },
            customOpacity: {
                type: 'number',
                required: false
            }
        }
    }),

    options: function() {
        return new Promise(function(resolve) {
            this.model
                .addOption('gridWrapper', 'Has Grid-Wrapper?', 'boolean').on('change:gridWrapper', onChangeGridWrapper, this)
                .addOption('gridWrapperFluid', 'Has Fluid Grid?', 'boolean').on('change:gridWrapperFluid', onChangeGridWrapperFluid, this)
                .addOption('gridRow', 'Has Grid-Row?', 'boolean').on('change:gridRow', onChangeGridRow, this)
                .addOption('customBackground', 'Custom Background Active?', 'boolean').on('change:customBackground', onChangeCustomBackground, this)
                .addOption('customBackgroundColor', 'Custom Background-Color', 'color').on('change:customBackgroundColor', onChangeCustomBackground, this);
            resolve();
        }.bind(this));
    },

    ready: function() {
        return Feature.prototype.ready.apply(this, arguments).then(function() {
            this.wrapperEl = document.querySelector(this.model.wrapperSelector);
            this.rowEl = document.querySelector(this.model.rowSelector);
            this.backgroundEl = document.querySelector(this.model.backgroundSelector);
            this.model.on('change:active', onChangeActive, this);
        }.bind(this));
    }

});

function onChangeActive(model) {
    onChangeGridWrapper.bind(this)(model);
    onChangeGridWrapperFluid.bind(this)(model);
    onChangeGridRow.bind(this)(model);
    onChangeCustomBackground.bind(this)(model);
}

function onChangeGridRow(model) {
    if (model.gridRow && model.active) {
        this.rowEl.classList.add('grid-g');
    } else {
        this.rowEl.classList.remove('grid-g');
    }
}

function onChangeGridWrapper(model) {
    if (model.gridWrapper && model.active) {
        this.wrapperEl.classList.add('grid-wrapper');
    } else {
        this.wrapperEl.classList.remove('grid-wrapper');
    }
}

function onChangeGridWrapperFluid(model) {
    if (model.gridWrapperFluid && model.active) {
        this.wrapperEl.classList.add('grid-wrapper-fluid');
    } else {
        this.wrapperEl.classList.remove('grid-wrapper-fluid');
    }
}

function onChangeCustomBackground(model) {
    if (model.customBackground && model.customBackgroundColor && model.active) {
        this.backgroundEl.style.cssText = 'background: ' + model.customBackgroundColor + '; opacity: 1;';
    } else {
        this.backgroundEl.style.cssText = null;
    }
}

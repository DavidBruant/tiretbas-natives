(function(global){
    'use strict';
    
    try{
        Object.defineProperty({}, 'x', {}); // IE8 has a bogus version of Object.defineProperty
    }
    catch(e){
        return; // don't define getter/setters in IE8
    }

    Object.defineProperty(Array.prototype, '_last', {
        get: function(){
            return this[this.length -1];
        }
    });

    Object.defineProperty(Array.prototype, '_first', {
        get: function(){
            return this[0];
        }
    });
    
    Function.prototype._curry = function _curry(){
        return this.bind.apply(this, undefined, arguments);
    };
    
    // cause ECMAScript Date months are bullshit! (old Java-based API)
    Date._JANUARY = 0;
    Date._FEBRUARY = 1;
    Date._MARCH = 2;
    Date._APRIL = 3;
    Date._MAY = 4;
    Date._JUNE = 5;
    Date._JULY = 6;
    Date._AUGUST = 7;
    Date._SEPTEMBER = 8;
    Date._OCTOBER = 9;
    Date._NOVEMBER = 10;
    Date._DECEMBER = 11;
    
    // DOM
    // EventTarget
    EventTarget.prototype._on = EventTarget.prototype.addEventListener;
    // IE8 doesn't have addEventListener *sigh*
    
    EventTarget.prototype._off = EventTarget.prototype.removeEventListener;
    EventTarget.prototype._once = function(name, listener, useCapture){
        this.addEventListener(name, function newListener(){
            this.removeEventListener(name, newListener, useCapture);
            
            listener.apply(this, arguments);
        }, useCapture);
    };
    EventTarget.prototype._emit = EventTarget.prototype.dispatchEvent;
    
    // Element
    Element.prototype._empty = function _empty(){
        this.innerHTML = '';
    };
    
    // hidden attribute is a standard thing https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#hidden
    
        /*
        CSS overrides what the hidden attribute says. In some cases (i.e. an element has display:flex), it will be needed to
        add el[hidden]{display:none;}. This is a trade-off, hopefully reasonable.
        */
    Element.prototype._hide = function _hide(){
        this.setAttribute('hidden', '');
    };
    Element.prototype._show = function _show(){
        this.removeAttribute('hidden');
    };
    
    // usually collections define in DOM specs don't inherit from Array.prototype. Enhancing them.
    [
        NodeList,
        HTMLCollection,
        FileList
    ].forEach(function(collectionType){
        Object.getOwnPropertyNames(Array.prototype).forEach(function(prop){
            if(typeof Array.prototype[prop] === 'function')
                collectionType.prototype['_'+prop] = Array.prototype[prop];
        })
    })
    
    
    
    
})(this);
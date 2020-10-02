// Array
export const last = Symbol()

Object.defineProperty(Array.prototype, last, {
    get: function(){
        return this[this.length -1];
    }
});


// EventTarget
export const on = Symbol()
export const off = Symbol()
export const once = Symbol()
export const emit = Symbol()

EventTarget.prototype[on] = EventTarget.prototype.addEventListener;
EventTarget.prototype[off] = EventTarget.prototype.removeEventListener;
EventTarget.prototype[once] = function(name, listener, useCapture){
    this.addEventListener(name, function newListener(){
        this.removeEventListener(name, newListener, useCapture);
        
        listener.apply(this, arguments);
    }, useCapture);
};
EventTarget.prototype[emit] = EventTarget.prototype.dispatchEvent;


// Element
export const empty = Symbol()
export const hide = Symbol()
export const show = Symbol()

Element.prototype[empty] = function(){
    this.innerHTML = '';
};

/* 
hidden attribute is a standard thing https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#hidden

CSS overrides what the hidden attribute says. In some cases (i.e. an element has display:flex), it will be needed to
add [hidden]{display:none; !important}. This is a trade-off, hopefully reasonable.
*/
Element.prototype[hide] = function(){
    this.setAttribute('hidden', '');
};
Element.prototype[show] = function(){
    this.removeAttribute('hidden');
};
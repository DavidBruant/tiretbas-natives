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
    /*addBuiltin(Array.prototype, '_unique', {
        value: function(){ throw 'TODO'; }
    });*/
    
    Function.prototype._curry = function _curry(){
        return this.bind.apply(this, undefined, arguments);
    };
    
    
    // DOM
    // EventTarget
    
    EventTarget.prototype._on = EventTarget.prototype.addEventListener;
    // IE8 doesn't have addEventListener *sigh*
    
    EventTarget.prototype._off = EventTarget.prototype.removeEventListener;
    EventTarget.prototype._once = function(name, listener, useCapture){
        this.addEventListener(name, function newListener(){
            this.removeEventListener(name, newListener, useCapture);
            
            try{
                listener.apply(this, arguments);
            }
            catch(e){
                throw e; // rethrowing for window.onerror
            }
        }, useCapture);
    } });
    EventTarget.prototype._emit = EventTarget.prototype.dispatchEvent;
    

    Element.prototype._empty = function _empty(){
        this.innerHTML = '';
    }
    
})(this);
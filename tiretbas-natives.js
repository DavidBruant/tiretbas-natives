(function(global){
    var correctObjectDefineProperty;
    try{
        Object.defineProperty({}, 'x', {}); // IE8 has a bogus version of Object.defineProperty
        correctObjectDefineProperty = true;
    }
    catch(e){
        correctObjectDefineProperty = false;
    }
    
    var addBuiltin = correctObjectDefineProperty ?
        function(base, name, propDesc){
            /* default property descriptor as explained at the end of http://es5.github.io/#x15 :
            Every (...) property described in this clause has the attributes
            { [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: true } unless otherwise specified.
            */
            var desc = {
                enumerable: false,
                configurable: true
            };
            
            if(name[0] !== '_')
                throw new Error("the method being added doesn't start with _: "+name);
            
            for(var attr in propDesc){
                desc[attr] = propDesc[attr];
            }
            
            if(!('get' in desc || 'set' in desc || 'writable' in desc)){
                desc.writable = true;
            }
            
            Object.defineProperty(base, name, desc);
            
        } :
        function(base, name, propDesc){
            if(name[0] !== '_')
                throw new Error("the method being added doesn't start with _: "+name);
            
            if('value' in propDesc) // don't do anything with getter/setters
                base[name] = propDesc[value]; // will lead to semantic differences when it comes to enumerability
        } ;
    
    // ECMAScript built-ins
    
    addBuiltin(Array.prototype, '_last', {get: function(){ return this[this.length -1] } });
    addBuiltin(Array.prototype, '_first', {get: function(){ return this[0] } });
    
    /*addBuiltin(Array.prototype, '_unique', {
        value: function(){ throw 'TODO'; }
    });*/
    
    addBuiltin(Function.prototype, '_curry', {
        value: function(){ return this.bind.apply(this, undefined, arguments); }
    });
    
    
    
    // DOM
    // EventTarget
    
    addBuiltin(EventTarget.prototype, '_on', {value: EventTarget.prototype.addEventListener });
    // IE8 doesn't have addEventListener *sigh*
    addBuiltin(EventTarget.prototype, '_off', {value: EventTarget.prototype.removeEventListener });
    addBuiltin(EventTarget.prototype, '_once', {value: function(name, listener, useCapture){
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
    addBuiltin(EventTarget.prototype, '_emit', {value: EventTarget.prototype.dispatchEvent });
    
    
    
})(this);
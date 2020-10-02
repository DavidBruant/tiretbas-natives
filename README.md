# tiretbas-natives

## Let's extend the builtins safely!

### Historically, 

extending builtins has been considered a [bad practice](http://perfectionkills.com/extending-built-in-native-objects-evil-or-not/) if not [harmful](http://perfectionkills.com/whats-wrong-with-extending-the-dom/). If not done carefully, it can also be [future-hostile](https://bugzilla.mozilla.org/show_bug.cgi?id=903755).

The future hostility was rooted in the fact that extensions were using names that may end up being chosen by standards (and it happened indeed, more often that not). What web developers need to extend built-ins safely is a namespace that is guaranteed to never be used by [ECMAScript](http://wiki.ecmascript.org/doku.php) or [WHATWG](http://www.whatwg.org/) standards.

Experience has shown that standards never add built-ins prefixed with `_`. The only exceptions are de facto standards for `__proto__` and `__defineGetter__` & friends. Beyond this observation, ECMAScript 6 will have symbols, a way to extend the platform without collisions. Symbols are even used by the ES6 spec for meta-programming extensions like @@create and @@iterator.
In the end, the `_` prefix looks safe to use.

## New builtins

Based on [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

### Array.prototype

`last` : returns the last element of the array

```js
import {last} from '<path>/extend-builtin.js'

const myArray = [87, 45, 9, 34];

console.log(myArray[last]); // 34
```



### EventTarget.prototype

`on`: `addEventListener` alias

`off`: `removeEventListener` alias

`once`: like `addEventListener` but removing itself right after the event happened.
This is particularly useful for the `DOMContentLoaded` event for which a good practice is to remove the listener to
avoid leaking memory.

`emit`: ````dispatchEvent```` alias


## Expectations and licence

I expect to be credited for this work

It is CC0-1.0 licenced
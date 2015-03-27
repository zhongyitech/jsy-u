/**
 * Created by William.Wei on 2015/3/3. weizhansheng@outlook.com
 */
(function(){
    if(!String.prototype.trim){
        String.prototype.trim = function(){
            return this.trimLeft(this.trimRight(this));
        };
        String.prototype.trimLeft = function(str){
            var i;
            for(i=0;i<str.length;i++)
            {
                if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
            }
            str=str.substring(i,str.length);
            return str;
        };
        String.prototype.trimRight = function(str){
            var i;
            for(i=str.length-1;i>=0;i--)
            {
                if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
            }
            str=str.substring(0,i+1);
            return str;
        };
    }
})();
 /*
    json2.js
    2015-02-25

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 
                        ? '0' + n 
                        : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint 
    eval, for, this 
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 
        ? '0' + n 
        : n;
    }
    
    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
            ? this.getUTCFullYear() + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate()) + 'T' +
                    f(this.getUTCHours()) + ':' +
                    f(this.getUTCMinutes()) + ':' +
                    f(this.getUTCSeconds()) + 'Z'
            : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var cx,
        escapable,
        gap,
        indent,
        meta,
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) 
        ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
            ? c
            : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' 
        : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) 
            ? String(value) 
            : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                ? '[]'
                : gap
                ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap 
                                ? ': ' 
                                : ':'
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap 
                                ? ': ' 
                                : ':'
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
            ? '{}'
            : gap
            ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
            : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (
                /^[\],:{}\s]*$/.test(
                    text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                ? walk({'': j}, '')
                : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
/**
 *  Ajax Autocomplete for jQuery, version 1.2.16
 *  (c) 2014 Tomas Kirda
 *
 *  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
 *  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
 */

/*jslint  browser: true, white: true, plusplus: true, vars: true */
/*global define, window, document, jQuery, exports, require */

// Expose plugin as an AMD module if AMD loader is present:
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && typeof require === 'function') {
        // Browserify
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var utils = (function () {
            return {
                escapeRegExChars: function (value) {
                    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                },
                createNode: function (containerClass) {
                    var div = document.createElement('div');
                    div.className = containerClass;
                    div.style.position = 'absolute';
                    div.style.display = 'none';
                    return div;
                }
            };
        }()),

        keys = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };

    function Autocomplete(el, options) {
        var noop = function () { },
            that = this,
            defaults = {
                ajaxSettings: {},
                autoSelectFirst: false,
                appendTo: document.body,
                serviceUrl: null,
                lookup: null,
                onSelect: null,
                width: 'auto',
                minChars: 1,
                maxHeight: 300,
                deferRequestBy: 0,
                params: {},
                formatResult: Autocomplete.formatResult,
                delimiter: null,
                zIndex: 9999,
                type: 'GET',
                noCache: false,
                onSearchStart: noop,
                onSearchComplete: noop,
                onSearchError: noop,
                preserveInput: false,
                containerClass: 'autocomplete-suggestions',
                tabDisabled: false,
                dataType: 'text',
                currentRequest: null,
                triggerSelectOnValidInput: true,
                preventBadQueries: true,
                lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                    return suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1;
                },
                paramName: 'query',
                transformResult: function (response) {
                    return typeof response === 'string' ? $.parseJSON(response) : response;
                },
                showNoSuggestionNotice: false,
                noSuggestionNotice: 'No results',
                orientation: 'bottom',
                forceFixPosition: false
            };

        // Shared variables:
        that.element = el;
        that.el = $(el);
        that.suggestions = [];
        that.badQueries = [];
        that.selectedIndex = -1;
        that.currentValue = that.element.value;
        that.intervalId = 0;
        that.cachedResponse = {};
        that.onChangeInterval = null;
        that.onChange = null;
        that.isLocal = false;
        that.suggestionsContainer = null;
        that.noSuggestionsContainer = null;
        that.options = $.extend({}, defaults, options);
        that.classes = {
            selected: 'autocomplete-selected',
            suggestion: 'autocomplete-suggestion'
        };
        that.hint = null;
        that.hintValue = '';
        that.selection = null;

        // Initialize and set options:
        that.initialize();
        that.setOptions(options);
    }

    Autocomplete.utils = utils;

    $.Autocomplete = Autocomplete;

    Autocomplete.formatResult = function (suggestion, currentValue) {
        var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

        return suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
    };

    Autocomplete.prototype = {

        killerFn: null,

        initialize: function () {
            var that = this,
                suggestionSelector = '.' + that.classes.suggestion,
                selected = that.classes.selected,
                options = that.options,
                container;

            // Remove autocomplete attribute to prevent native suggestions:
            that.element.setAttribute('autocomplete', 'off');

            that.killerFn = function (e) {
                if ($(e.target).closest('.' + that.options.containerClass).length === 0) {
                    that.killSuggestions();
                    that.disableKillerFn();
                }
            };

            // html() deals with many types: htmlString or Element or Array or jQuery
            that.noSuggestionsContainer = $('<div class="autocomplete-no-suggestion"></div>')
                .html(this.options.noSuggestionNotice).get(0);

            that.suggestionsContainer = Autocomplete.utils.createNode(options.containerClass);

            container = $(that.suggestionsContainer);

            container.appendTo(options.appendTo);

            // Only set width if it was provided:
            if (options.width !== 'auto') {
                container.width(options.width);
            }

            // Listen for mouse over event on suggestions list:
            container.on('mouseover.autocomplete', suggestionSelector, function () {
                that.activate($(this).data('index'));
            });

            // Deselect active element when mouse leaves suggestions container:
            container.on('mouseout.autocomplete', function () {
                that.selectedIndex = -1;
                container.children('.' + selected).removeClass(selected);
            });

            // Listen for click event on suggestions list:
            container.on('click.autocomplete', suggestionSelector, function () {
                that.select($(this).data('index'));
            });

            that.fixPositionCapture = function () {
                if (that.visible) {
                    that.fixPosition();
                }
            };

            $(window).on('resize.autocomplete', that.fixPositionCapture);

            that.el.on('keydown.autocomplete', function (e) { that.onKeyPress(e); });
            that.el.on('keyup.autocomplete', function (e) { that.onKeyUp(e); });
            that.el.on('blur.autocomplete', function () { that.onBlur(); });
            that.el.on('focus.autocomplete', function () { that.onFocus(); });
            that.el.on('change.autocomplete', function (e) { that.onKeyUp(e); });
            that.el.on('input.autocomplete', function (e) { that.onKeyUp(e); });
        },

        onFocus: function () {
            var that = this;
            that.fixPosition();
            if (that.options.minChars <= that.el.val().length) {
                that.onValueChange();
            }
        },

        onBlur: function () {
            this.enableKillerFn();
        },

        setOptions: function (suppliedOptions) {
            var that = this,
                options = that.options;

            $.extend(options, suppliedOptions);

            that.isLocal = $.isArray(options.lookup);

            if (that.isLocal) {
                options.lookup = that.verifySuggestionsFormat(options.lookup);
            }

            options.orientation = that.validateOrientation(options.orientation, 'bottom');

            // Adjust height, width and z-index:
            $(that.suggestionsContainer).css({
                'max-height': options.maxHeight + 'px',
                'width': options.width + 'px',
                'z-index': options.zIndex
            });
        },


        clearCache: function () {
            this.cachedResponse = {};
            this.badQueries = [];
        },

        clear: function () {
            this.clearCache();
            this.currentValue = '';
            this.suggestions = [];
        },

        disable: function () {
            var that = this;
            that.disabled = true;
            clearInterval(that.onChangeInterval);
            if (that.currentRequest) {
                that.currentRequest.abort();
            }
        },

        enable: function () {
            this.disabled = false;
        },

        fixPosition: function () {
            // Use only when container has already its content

            var that = this,
                $container = $(that.suggestionsContainer),
                containerParent = $container.parent().get(0);
            // Fix position automatically when appended to body.
            // In other cases force parameter must be given.
            if (containerParent !== document.body && !that.options.forceFixPosition) {
                return;
            }

            // Choose orientation
            var orientation = that.options.orientation,
                containerHeight = $container.outerHeight(),
                height = that.el.outerHeight(),
                offset = that.el.offset(),
                styles = { 'top': offset.top, 'left': offset.left };

            if (orientation === 'auto') {
                var viewPortHeight = $(window).height(),
                    scrollTop = $(window).scrollTop(),
                    topOverflow = -scrollTop + offset.top - containerHeight,
                    bottomOverflow = scrollTop + viewPortHeight - (offset.top + height + containerHeight);

                orientation = (Math.max(topOverflow, bottomOverflow) === topOverflow) ? 'top' : 'bottom';
            }

            if (orientation === 'top') {
                styles.top += -containerHeight;
            } else {
                styles.top += height;
            }

            // If container is not positioned to body,
            // correct its position using offset parent offset
            if (containerParent !== document.body) {
                var opacity = $container.css('opacity'),
                    parentOffsetDiff;

                if (!that.visible) {
                    $container.css('opacity', 0).show();
                }

                parentOffsetDiff = $container.offsetParent().offset();
                styles.top -= parentOffsetDiff.top;
                styles.left -= parentOffsetDiff.left;

                if (!that.visible) {
                    $container.css('opacity', opacity).hide();
                }
            }

            // -2px to account for suggestions border.
            if (that.options.width === 'auto') {
                styles.width = (that.el.outerWidth() - 2) + 'px';
            }

            $container.css(styles);
        },

        enableKillerFn: function () {
            var that = this;
            $(document).on('click.autocomplete', that.killerFn);
        },

        disableKillerFn: function () {
            var that = this;
            $(document).off('click.autocomplete', that.killerFn);
        },

        killSuggestions: function () {
            var that = this;
            that.stopKillSuggestions();
            that.intervalId = window.setInterval(function () {
                that.hide();
                that.stopKillSuggestions();
            }, 50);
        },

        stopKillSuggestions: function () {
            window.clearInterval(this.intervalId);
        },

        isCursorAtEnd: function () {
            var that = this,
                valLength = that.el.val().length,
                selectionStart = that.element.selectionStart,
                range;

            if (typeof selectionStart === 'number') {
                return selectionStart === valLength;
            }
            if (document.selection) {
                range = document.selection.createRange();
                range.moveStart('character', -valLength);
                return valLength === range.text.length;
            }
            return true;
        },

        onKeyPress: function (e) {
            var that = this;

            // If suggestions are hidden and user presses arrow down, display suggestions:
            if (!that.disabled && !that.visible && e.which === keys.DOWN && that.currentValue) {
                that.suggest();
                return;
            }

            if (that.disabled || !that.visible) {
                return;
            }

            switch (e.which) {
                case keys.ESC:
                    that.el.val(that.currentValue);
                    that.hide();
                    break;
                case keys.RIGHT:
                    if (that.hint && that.options.onHint && that.isCursorAtEnd()) {
                        that.selectHint();
                        break;
                    }
                    return;
                case keys.TAB:
                    if (that.hint && that.options.onHint) {
                        that.selectHint();
                        return;
                    }
                    if (that.selectedIndex === -1) {
                        that.hide();
                        return;
                    }
                    that.select(that.selectedIndex);
                    if (that.options.tabDisabled === false) {
                        return;
                    }
                    break;
                case keys.RETURN:
                    if (that.selectedIndex === -1) {
                        that.hide();
                        return;
                    }
                    that.select(that.selectedIndex);
                    break;
                case keys.UP:
                    that.moveUp();
                    break;
                case keys.DOWN:
                    that.moveDown();
                    break;
                default:
                    return;
            }

            // Cancel event if function did not return:
            e.stopImmediatePropagation();
            e.preventDefault();
        },

        onKeyUp: function (e) {
            var that = this;

            if (that.disabled) {
                return;
            }

            switch (e.which) {
                case keys.UP:
                case keys.DOWN:
                    return;
            }

            clearInterval(that.onChangeInterval);

            if (that.currentValue !== that.el.val()) {
                that.findBestHint();
                if (that.options.deferRequestBy > 0) {
                    // Defer lookup in case when value changes very quickly:
                    that.onChangeInterval = setInterval(function () {
                        that.onValueChange();
                    }, that.options.deferRequestBy);
                } else {
                    that.onValueChange();
                }
            }
        },

        onValueChange: function () {
            var that = this,
                options = that.options,
                value = that.el.val(),
                query = that.getQuery(value),
                index;

            if (that.selection && that.currentValue !== query) {
                that.selection = null;
                (options.onInvalidateSelection || $.noop).call(that.element);
            }

            clearInterval(that.onChangeInterval);
            that.currentValue = value;
            that.selectedIndex = -1;

            // Check existing suggestion for the match before proceeding:
            if (options.triggerSelectOnValidInput) {
                index = that.findSuggestionIndex(query);
                if (index !== -1) {
                    that.select(index);
                    return;
                }
            }

            if (query.length < options.minChars) {
                that.hide();
            } else {
                that.getSuggestions(query);
            }
        },

        findSuggestionIndex: function (query) {
            var that = this,
                index = -1,
                queryLowerCase = query.toLowerCase();

            $.each(that.suggestions, function (i, suggestion) {
                if (suggestion.value.toLowerCase() === queryLowerCase) {
                    index = i;
                    return false;
                }
            });

            return index;
        },

        getQuery: function (value) {
            var delimiter = this.options.delimiter,
                parts;

            if (!delimiter) {
                return value;
            }
            parts = value.split(delimiter);
            return $.trim(parts[parts.length - 1]);
        },

        getSuggestionsLocal: function (query) {
            var that = this,
                options = that.options,
                queryLowerCase = query.toLowerCase(),
                filter = options.lookupFilter,
                limit = parseInt(options.lookupLimit, 10),
                data;

            data = {
                suggestions: $.grep(options.lookup, function (suggestion) {
                    return filter(suggestion, query, queryLowerCase);
                })
            };

            if (limit && data.suggestions.length > limit) {
                data.suggestions = data.suggestions.slice(0, limit);
            }

            return data;
        },

        getSuggestions: function (q) {
            var response,
                that = this,
                options = that.options,
                serviceUrl = options.serviceUrl,
                params,
                cacheKey,
                ajaxSettings;

            options.params[options.paramName] = q;
            params = options.ignoreParams ? null : options.params;

            if (options.onSearchStart.call(that.element, options.params) === false) {
                return;
            }

            if ($.isFunction(options.lookup)) {
                options.lookup(q, function (data) {
                    that.suggestions = data.suggestions;
                    that.suggest();
                    options.onSearchComplete.call(that.element, q, data.suggestions);
                });
                return;
            }

            if (that.isLocal) {
                response = that.getSuggestionsLocal(q);
            } else {
                if ($.isFunction(serviceUrl)) {
                    serviceUrl = serviceUrl.call(that.element, q);
                }
                cacheKey = serviceUrl + '?' + $.param(params || {});
                response = that.cachedResponse[cacheKey];
            }

            if (response && $.isArray(response.suggestions)) {
                that.suggestions = response.suggestions;
                that.suggest();
                options.onSearchComplete.call(that.element, q, response.suggestions);
            } else if (!that.isBadQuery(q)) {
                if (that.currentRequest) {
                    that.currentRequest.abort();
                }

                ajaxSettings = {
                    url: serviceUrl,
                    data: params,
                    type: options.type,
                    dataType: options.dataType
                };

                $.extend(ajaxSettings, options.ajaxSettings);

                that.currentRequest = $.ajax(ajaxSettings).done(function (data) {
                    var result;
                    that.currentRequest = null;
                    result = options.transformResult(data);
                    that.processResponse(result, q, cacheKey);
                    options.onSearchComplete.call(that.element, q, result.suggestions);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    options.onSearchError.call(that.element, q, jqXHR, textStatus, errorThrown);
                });
            } else {
                options.onSearchComplete.call(that.element, q, []);
            }
        },

        isBadQuery: function (q) {
            if (!this.options.preventBadQueries) {
                return false;
            }

            var badQueries = this.badQueries,
                i = badQueries.length;

            while (i--) {
                if (q.indexOf(badQueries[i]) === 0) {
                    return true;
                }
            }

            return false;
        },

        hide: function () {
            var that = this;
            that.visible = false;
            that.selectedIndex = -1;
            clearInterval(that.onChangeInterval);
            $(that.suggestionsContainer).hide();
            that.signalHint(null);
        },

        suggest: function () {
            if (this.suggestions.length === 0) {
                if (this.options.showNoSuggestionNotice) {
                    this.noSuggestions();
                } else {
                    this.hide();
                }
                return;
            }

            var that = this,
                options = that.options,
                groupBy = options.groupBy,
                formatResult = options.formatResult,
                value = that.getQuery(that.currentValue),
                className = that.classes.suggestion,
                classSelected = that.classes.selected,
                container = $(that.suggestionsContainer),
                noSuggestionsContainer = $(that.noSuggestionsContainer),
                beforeRender = options.beforeRender,
                html = '',
                category,
                formatGroup = function (suggestion, index) {
                    var currentCategory = suggestion.data[groupBy];

                    if (category === currentCategory) {
                        return '';
                    }

                    category = currentCategory;

                    return '<div class="autocomplete-group"><strong>' + category + '</strong></div>';
                },
                index;

            if (options.triggerSelectOnValidInput) {
                index = that.findSuggestionIndex(value);
                if (index !== -1) {
                    that.select(index);
                    return;
                }
            }

            // Build suggestions inner HTML:
            $.each(that.suggestions, function (i, suggestion) {
                if (groupBy) {
                    html += formatGroup(suggestion, value, i);
                }

                html += '<div class="' + className + '" data-index="' + i + '">' + formatResult(suggestion, value) + '</div>';
            });

            this.adjustContainerWidth();

            noSuggestionsContainer.detach();
            container.html(html);

            if ($.isFunction(beforeRender)) {
                beforeRender.call(that.element, container);
            }

            that.fixPosition();
            container.show();

            // Select first value by default:
            if (options.autoSelectFirst) {
                that.selectedIndex = 0;
                container.scrollTop(0);
                container.children().first().addClass(classSelected);
            }

            that.visible = true;
            that.findBestHint();
        },

        noSuggestions: function () {
            var that = this,
                container = $(that.suggestionsContainer),
                noSuggestionsContainer = $(that.noSuggestionsContainer);

            this.adjustContainerWidth();

            // Some explicit steps. Be careful here as it easy to get
            // noSuggestionsContainer removed from DOM if not detached properly.
            noSuggestionsContainer.detach();
            container.empty(); // clean suggestions if any
            container.append(noSuggestionsContainer);

            that.fixPosition();

            container.show();
            that.visible = true;
        },

        adjustContainerWidth: function () {
            var that = this,
                options = that.options,
                width,
                container = $(that.suggestionsContainer);

            // If width is auto, adjust width before displaying suggestions,
            // because if instance was created before input had width, it will be zero.
            // Also it adjusts if input width has changed.
            // -2px to account for suggestions border.
            if (options.width === 'auto') {
                width = that.el.outerWidth() - 2;
                container.width(width > 0 ? width : 300);
            }
        },

        findBestHint: function () {
            var that = this,
                value = that.el.val().toLowerCase(),
                bestMatch = null;

            if (!value) {
                return;
            }

            $.each(that.suggestions, function (i, suggestion) {
                var foundMatch = suggestion.value.toLowerCase().indexOf(value) === 0;
                if (foundMatch) {
                    bestMatch = suggestion;
                }
                return !foundMatch;
            });

            that.signalHint(bestMatch);
        },

        signalHint: function (suggestion) {
            var hintValue = '',
                that = this;
            if (suggestion) {
                hintValue = that.currentValue + suggestion.value.substr(that.currentValue.length);
            }
            if (that.hintValue !== hintValue) {
                that.hintValue = hintValue;
                that.hint = suggestion;
                (this.options.onHint || $.noop)(hintValue);
            }
        },

        verifySuggestionsFormat: function (suggestions) {
            // If suggestions is string array, convert them to supported format:
            if (suggestions.length && typeof suggestions[0] === 'string') {
                return $.map(suggestions, function (value) {
                    return { value: value, data: null };
                });
            }

            return suggestions;
        },

        validateOrientation: function (orientation, fallback) {
            orientation = $.trim(orientation || '').toLowerCase();

            if ($.inArray(orientation, ['auto', 'bottom', 'top']) === -1) {
                orientation = fallback;
            }

            return orientation;
        },

        processResponse: function (result, originalQuery, cacheKey) {
            var that = this,
                options = that.options;

            result.suggestions = that.verifySuggestionsFormat(result.suggestions);

            // Cache results if cache is not disabled:
            if (!options.noCache) {
                that.cachedResponse[cacheKey] = result;
                if (options.preventBadQueries && result.suggestions.length === 0) {
                    that.badQueries.push(originalQuery);
                }
            }

            // Return if originalQuery is not matching current query:
            if (originalQuery !== that.getQuery(that.currentValue)) {
                return;
            }

            that.suggestions = result.suggestions;
            that.suggest();
        },

        activate: function (index) {
            var that = this,
                activeItem,
                selected = that.classes.selected,
                container = $(that.suggestionsContainer),
                children = container.find('.' + that.classes.suggestion);

            container.find('.' + selected).removeClass(selected);

            that.selectedIndex = index;

            if (that.selectedIndex !== -1 && children.length > that.selectedIndex) {
                activeItem = children.get(that.selectedIndex);
                $(activeItem).addClass(selected);
                return activeItem;
            }

            return null;
        },

        selectHint: function () {
            var that = this,
                i = $.inArray(that.hint, that.suggestions);

            that.select(i);
        },

        select: function (i) {
            var that = this;
            that.hide();
            that.onSelect(i);
        },

        moveUp: function () {
            var that = this;

            if (that.selectedIndex === -1) {
                return;
            }

            if (that.selectedIndex === 0) {
                $(that.suggestionsContainer).children().first().removeClass(that.classes.selected);
                that.selectedIndex = -1;
                that.el.val(that.currentValue);
                that.findBestHint();
                return;
            }

            that.adjustScroll(that.selectedIndex - 1);
        },

        moveDown: function () {
            var that = this;

            if (that.selectedIndex === (that.suggestions.length - 1)) {
                return;
            }

            that.adjustScroll(that.selectedIndex + 1);
        },

        adjustScroll: function (index) {
            var that = this,
                activeItem = that.activate(index);

            if (!activeItem) {
                return;
            }

            var offsetTop,
                upperBound,
                lowerBound,
                heightDelta = $(activeItem).outerHeight();

            offsetTop = activeItem.offsetTop;
            upperBound = $(that.suggestionsContainer).scrollTop();
            lowerBound = upperBound + that.options.maxHeight - heightDelta;

            if (offsetTop < upperBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop);
            } else if (offsetTop > lowerBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop - that.options.maxHeight + heightDelta);
            }

            if (!that.options.preserveInput) {
                that.el.val(that.getValue(that.suggestions[index].value));
            }
            that.signalHint(null);
        },

        onSelect: function (index) {
            var that = this,
                onSelectCallback = that.options.onSelect,
                suggestion = that.suggestions[index];

            that.currentValue = that.getValue(suggestion.value);

            if (that.currentValue !== that.el.val() && !that.options.preserveInput) {
                that.el.val(that.currentValue);
            }

            that.signalHint(null);
            that.suggestions = [];
            that.selection = suggestion;

            if ($.isFunction(onSelectCallback)) {
                onSelectCallback.call(that.element, suggestion);
            }
        },

        getValue: function (value) {
            var that = this,
                delimiter = that.options.delimiter,
                currentValue,
                parts;

            if (!delimiter) {
                return value;
            }

            currentValue = that.currentValue;
            parts = currentValue.split(delimiter);

            if (parts.length === 1) {
                return value;
            }

            return currentValue.substr(0, currentValue.length - parts[parts.length - 1].length) + value;
        },

        dispose: function () {
            var that = this;
            that.el.off('.autocomplete').removeData('autocomplete');
            that.disableKillerFn();
            $(window).off('resize.autocomplete', that.fixPositionCapture);
            $(that.suggestionsContainer).remove();
        }
    };

    // Create chainable jQuery plugin:
    $.fn.autocomplete = $.fn.devbridgeAutocomplete = function (options, args) {
        var dataKey = 'autocomplete';
        // If function invoked without argument return
        // instance of the first matched element:
        if (arguments.length === 0) {
            return this.first().data(dataKey);
        }

        return this.each(function () {
            var inputElement = $(this),
                instance = inputElement.data(dataKey);

            if (typeof options === 'string') {
                if (instance && typeof instance[options] === 'function') {
                    instance[options](args);
                }
            } else {
                // If instance already exists, destroy it:
                if (instance && instance.dispose) {
                    instance.dispose();
                }
                instance = new Autocomplete(this, options);
                inputElement.data(dataKey, instance);
            }
        });
    };
}));
/**
 * jTemplates 0.8.4 (http://jtemplates.tpython.com)
 * Copyright (c) 2007-2013 Tomasz Gloc (http://www.tpython.com)
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and/or GPL (GPL-LICENSE.txt) licenses.
 *
 * Id: $Id: jquery-jtemplates_uncompressed.js 203 2013-02-03 13:28:34Z tom $
 */

/**
 * @fileOverview Template engine in JavaScript.
 * @name jTemplates
 * @author Tomasz Gloc
 * @date $Date: 2013-02-03 14:28:34 +0100 (N, 03 lut 2013) $
 */

if (window.jQuery && !window.jQuery.createTemplate) {(function (jQuery) {

    /**
     * [abstract]
     * @name BaseNode
     * @class Abstract node. [abstract]
     */

    /**
     * Process node and get the html string. [abstract]
     * @name get
     * @function
     * @param {object} d data
     * @param {object} param parameters
     * @param {Element} element a HTML element
     * @param {Number} deep
     * @return {String}
     * @memberOf BaseNode
     */

    /**
     * [abstract]
     * @name BaseArray
     * @augments BaseNode
     * @class Abstract array/collection. [abstract]
     */

    /**
     * Add node 'e' to array.
     * @name push
     * @function
     * @param {BaseNode} e a node
     * @memberOf BaseArray
     */

    /**
     * See (http://jquery.com/).
     * @name jQuery
     * @class jQuery Library (http://jquery.com/)
     */

    /**
     * See (http://jquery.com/)
     * @name fn
     * @class jQuery Library (http://jquery.com/)
     * @memberOf jQuery
     */

    /**
     * Create new template from string s.
     * @name Template
     * @class A template or multitemplate.
     * @param {string} s A template string (like: "Text: {$T.txt}.").
     * @param {array} [includes] Array of included templates.
     * @param {object} [settings] Settings.
     * @config {boolean} [disallow_functions] Do not allow use function in data (default: true).
     * @config {boolean} [filter_data] Enable filter data using escapeHTML (default: true).
     * @config {boolean} [filter_params] Enable filter parameters using escapeHTML (default: false).
     * @config {boolean} [runnable_functions] Automatically run function (from data) inside {} [default: false].
     * @config {boolean} [clone_data] Clone input data [default: true]
     * @config {boolean} [clone_params] Clone input parameters [default: true]
     * @config {Function} [f_cloneData] Function used to data cloning
     * @config {Function} [f_escapeString] Function used to escape strings
     * @config {Function} [f_parseJSON] Function used to parse JSON
     * @augments BaseNode
     */
    var Template = function (s, includes, settings) {
        this._tree = [];
        this._param = {};
        this._includes = null;
        this._templates = {};
        this._templates_code = {};

        //default parameters
        this.settings = jQuery.extend({
            disallow_functions: false,
            filter_data: true,
            filter_params: false,
            runnable_functions: false,
            clone_data: true,
            clone_params: true
        }, settings);

        //set handlers
        this.f_cloneData = (this.settings.f_cloneData !== undefined) ? (this.settings.f_cloneData) : (TemplateUtils.cloneData);
        this.f_escapeString = (this.settings.f_escapeString !== undefined) ? (this.settings.f_escapeString) : (TemplateUtils.escapeHTML);
        this.f_parseJSON = (this.settings.f_parseJSON !== undefined) ? (this.settings.f_parseJSON) : ((this.settings.disallow_functions) ? (jQuery.parseJSON) : (TemplateUtils.parseJSON));

        if(s == null) {
            return;
        }

        //split multiteplate
        this.splitTemplates(s, includes);

        if(s) {
            //set main template
            this.setTemplate(this._templates_code['MAIN'], includes, this.settings);
        }

        this._templates_code = null;
    };

    /**
     * jTemplates version
     * @type string
     */
    Template.version = '0.8.4';

    /**
     * Debug mode (all errors are on), default: off
     * @type Boolean
     */
    Template.DEBUG_MODE = false;

    /**
     * Foreach loop limit (enable only when DEBUG_MODE = true)
     * @type integer
     */
    Template.FOREACH_LOOP_LIMIT = 10000;

    /**
     * Global guid
     * @type integer
     */
    Template.guid = 0;

    /**
     * Split multitemplate into multiple templates.
     * @param {string} s A template string (like: "Text: {$T.txt}.").
     * @param {array} includes Array of included templates.
     */
    Template.prototype.splitTemplates = function (s, includes) {
        var reg = /\{#template *(\w+) *(.*?) *\}/g, //split multitemplate into subtemplates
            iter, tname, se, lastIndex = null, _template_settings = [], i;

        //while find new subtemplate
        while((iter = reg.exec(s)) !== null) {
            lastIndex = reg.lastIndex;
            tname = iter[1];
            se = s.indexOf('{#/template ' + tname + '}', lastIndex);
            if(se === -1) {
                throw new Error('jTemplates: Template "' + tname + '" is not closed.');
            }
            //save a subtemplate and parse options
            this._templates_code[tname] = s.substring(lastIndex, se);
            _template_settings[tname] = TemplateUtils.optionToObject(iter[2]);
        }
        //when no subtemplates, use all as main template
        if(lastIndex === null) {
            this._templates_code['MAIN'] = s;
            return;
        }

        //create a new object for every subtemplates
        for(i in this._templates_code) {
            if(i !== 'MAIN') {
                this._templates[i] = new Template();
            }
        }
        for(i in this._templates_code) {
            if(i !== 'MAIN') {
                this._templates[i].setTemplate(this._templates_code[i],
                    jQuery.extend({}, includes || {}, this._templates || {}),
                    jQuery.extend({}, this.settings, _template_settings[i]));
                this._templates_code[i] = null;
            }
        }
    };

    /**
     * Parse template. (should be template, not multitemplate).
     * @param {string} s A template string (like: "Text: {$T.txt}.").
     * @param {array} includes Array of included templates.
     * @param {object} [settings] Settings.
     */
    Template.prototype.setTemplate = function (s, includes, settings) {
        if(s == undefined) {
            this._tree.push(new TextNode('', 1, this));
            return;
        }
        s = s.replace(/<!--|-->/g, ''); //remove endlines
        s = s.replace(/[\n\r]/g, ''); //remove endlines
        s = s.replace(/\{\*.*?\*\}/g, ''); //remove comments
        this._includes = jQuery.extend({}, this._templates || {}, includes || {});
        this.settings = new Object(settings);
        var node = this._tree,
            op = s.match(/\{#.*?\}/g), //find operators
            ss = 0, se = 0, e, literalMode = 0, i, l;

        //loop operators
        for(i=0, l=(op)?(op.length):(0); i<l; ++i) {
            var this_op = op[i];

            //when literal mode is on, treat operator like a text
            if(literalMode) {
                se = s.indexOf('{#/literal}', ss); //find end of block
                if(se === -1) {
                    throw new Error("jTemplates: No end of literal.");
                }
                if(se > ss) {
                    node.push(new TextNode(s.substring(ss, se), 1, this));
                }
                ss = se + 11; //strlen '{#/literal}'
                literalMode = 0;
                while(i < l && op[i] !== '{#/literal}') { //skip all operators until literal end
                    i++;
                }
                continue;
            }

            se = s.indexOf(this_op, ss);
            if(se > ss) {
                node.push(new TextNode(s.substring(ss, se), literalMode, this));
            }
            this_op.match(/\{#([\w\/]+).*?\}/); //find operator name
            var op_ = RegExp.$1;
            switch(op_) {
                case 'elseif':
                    node.addCond(this_op);
                    break;
                case 'if':
                    e = new opIF(node, this);
                    e.addCond(this_op);
                    node.push(e);
                    node = e;
                    break;
                case 'else':
                    node.switchToElse();
                    break;
                case '/if':
                case '/for':
                case '/foreach':
                    node = node.getParent();
                    break;
                case 'foreach':
                    e = new opFOREACH(this_op, node, this);
                    node.push(e);
                    node = e;
                    break;
                case 'for':
                    e = opFORFactory(this_op, node, this);
                    node.push(e);
                    node = e;
                    break;
                case 'continue':
                case 'break':
                    node.push(new JTException(op_));
                    break;
                case 'include':
                    node.push(new Include(this_op, this._includes, this));
                    break;
                case 'param':
                    node.push(new UserParam(this_op, this));
                    break;
                case 'var':
                    node.push(new UserVariable(this_op, this));
                    break;
                case 'cycle':
                    node.push(new Cycle(this_op));
                    break;
                case 'ldelim':
                    node.push(new TextNode('{', 1, this));
                    break;
                case 'rdelim':
                    node.push(new TextNode('}', 1, this));
                    break;
                case 'literal':
                    literalMode = 1;
                    break;
                case '/literal':
                    if(Template.DEBUG_MODE) {
                        throw new Error("jTemplates: Missing begin of literal.");
                    }
                    break;
                default:
                    if(Template.DEBUG_MODE) {
                        throw new Error('jTemplates: unknown tag: ' + op_ + '.');
                    }
            }

            ss = se + this_op.length;
        }

        if(s.length > ss) {
            node.push(new TextNode(s.substr(ss), literalMode, this));
        }
    };

    /**
     * Process template and get the html string.
     * @param {object} d data
     * @param {object} param parameters
     * @param {Element} element a HTML element
     * @param {Number} deep
     * @return {String}
     */
    Template.prototype.get = function (d, param, element, deep) {
        ++deep;

        if (deep == 1 && element != undefined) {
            jQuery.removeData(element, "jTemplatesRef");
        }

        var $T = d, $P, ret = '';

        //create clone of data
        if(this.settings.clone_data) {
            $T = this.f_cloneData(d, {escapeData: (this.settings.filter_data && deep == 1), noFunc: this.settings.disallow_functions}, this.f_escapeString);
        }

        //create clone of parameters
        if(!this.settings.clone_params) {
            $P = jQuery.extend({}, this._param, param);
        } else {
            $P = jQuery.extend({},
                this.f_cloneData(this._param, {escapeData: (this.settings.filter_params), noFunc: false}, this.f_escapeString),
                this.f_cloneData(param, {escapeData: (this.settings.filter_params && deep == 1), noFunc: false}, this.f_escapeString));
        }

        for(var i=0, l=this._tree.length; i<l; ++i) {
            ret += this._tree[i].get($T, $P, element, deep);
        }

        this.EvalObj = null;

        --deep;
        return ret;
    };

    /**
     * Create and return EvalClass object
     * @return {EvalClass}
     */
    Template.prototype.getBin = function () {
        if(this.EvalObj == null) {
            this.EvalObj = new EvalClass(this);
        }
        return this.EvalObj;
    };

    /**
     * Set to parameter 'name' value 'value'.
     * @param {string} name
     * @param {object} value
     */
    Template.prototype.setParam = function (name, value) {
        this._param[name] = value;
    };


    /**
     * Template utilities.
     * @namespace Template utilities.
     */
    TemplateUtils = function () {
    };

    /**
     * Replace chars &, >, <, ", ' with html entities.
     * To disable function set settings: filter_data=false, filter_params=false
     * @param {string} string
     * @return {string}
     * @static
     * @memberOf TemplateUtils
     */
    TemplateUtils.escapeHTML = function (txt) {
        return txt.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    };

    /**
     * Make a copy od data 'd'. It also filters data (depend on 'filter').
     * @param {object} d input data
     * @param {object} filter a filters
     * @config {boolean} [escapeData] Use escapeHTML on every string.
     * @config {boolean} [noFunc] Do not allow to use function (throws exception).
     * @param {Function} f_escapeString function using to filter string (usually: TemplateUtils.escapeHTML)
     * @return {object} output data (filtered)
     * @static
     * @memberOf TemplateUtils
     */
    TemplateUtils.cloneData = function (d, filter, f_escapeString) {
        if(d == null) {
            return d;
        }
        switch(d.constructor) {
            case Object:
                var o = {};
                for(var i in d) {
                    o[i] = TemplateUtils.cloneData(d[i], filter, f_escapeString);
                }
                if(!filter.noFunc) {
                    if(d.hasOwnProperty("toString")) {
                        o.toString = d.toString;
                    }
                }
                return o;
            case Array:
                var a = [];
                for(var i=0,l=d.length; i<l; ++i) {
                    a[i] = TemplateUtils.cloneData(d[i], filter, f_escapeString);
                }
                return a;
            case String:
                return (filter.escapeData) ? (f_escapeString(d)) : (d);
            case Function:
                if(filter.noFunc) {
                    if(Template.DEBUG_MODE) {
                        throw new Error("jTemplates: Functions are not allowed.");
                    }
                    else {
                        return undefined;
                    }
                }
        }
        return d;
    };

    /**
     * Convert text-based option string to Object
     * @param {string} optionText text-based option string
     * @return {Object}
     * @static
     * @memberOf TemplateUtils
     */
    TemplateUtils.optionToObject = function (optionText) {
        if(optionText === null || optionText === undefined) {
            return {};
        }

        var o = optionText.split(/[= ]/);
        if(o[0] === '') {
            o.shift();
        }

        var obj = {};
        for(var i=0, l=o.length; i<l; i+=2) {
            obj[o[i]] = o[i+1];
        }

        return obj;
    };

    /**
     * Parse JSON string into object
     * @param {string} data Text JSON
     * @return {Object}
     * @static
     */
    TemplateUtils.parseJSON = function (data) {
        if ( typeof data !== "string" || !data ) {
            return null;
        }
        try {
            return (new Function("return " + jQuery.trim(data)))();
        } catch(e) {
            if(Template.DEBUG_MODE) {
                throw new Error("jTemplates: Invalid JSON");
            }
            return {};
        }
    };

    /**
     * Find parents nodes for a reference value and return it
     * @param {Element} el html element
     * @param {int} guid template process unique identificator
     * @param {int} id index
     * @return {object}
     * @static
     */
    TemplateUtils.ReturnRefValue = function (el, guid, id) {
        //search element with stored data
        while(el != null) {
            var d = jQuery.data(el, 'jTemplatesRef');
            if(d != undefined && d.guid == guid && d.d[id] != undefined) {
                return d.d[id];
            }
            el = el.parentNode;
        }
        return null;
    };

    /**
     * Create a new text node.
     * @name TextNode
     * @class All text (block {..}) between control's block "{#..}".
     * @param {string} val text string
     * @param {boolean} literalMode When enable (true) template does not process blocks {..}.
     * @param {Template} Template object
     * @augments BaseNode
     */
    var TextNode = function (val, literalMode, template) {
        this._value = val;
        this._literalMode = literalMode;
        this._template = template;
    };

    /**
     * Get the html string for a text node.
     * @param {object} d data
     * @param {object} param parameters
     * @param {Element} element a HTML element
     * @param {Number} deep
     * @return {String}
     */
    TextNode.prototype.get = function (d, param, element, deep) {
        if(this._literalMode) {
            return this._value;
        }
        var s = this._value;
        var result = "";
        var i = -1;
        var nested = 0;
        var sText = -1;
        var sExpr = 0;
        while(true) {
            var lm = s.indexOf("{", i+1);
            var rm = s.indexOf("}", i+1);
            if(lm < 0 && rm < 0) {
                break;
            }
            if((lm != -1 && lm < rm) || (rm == -1)) {
                i = lm;
                if(++nested == 1) {
                    sText = lm;
                    result += s.substring(sExpr, i);
                    sExpr = -1;
                }
            } else {
                i = rm;
                if(--nested === 0) {
                    if(sText >= 0) {
                        result += this._template.getBin().evaluateContent(d, param, element, s.substring(sText, rm+1));
                        sText = -1;
                        sExpr = i+1;
                    }
                } else if(nested < 0) {
                    nested = 0;
                }
            }
        }
        if(sExpr > -1) {
            result += s.substr(sExpr);
        }
        return result;
    };

    /**
     * Virtual context for eval() (internal class)
     * @name EvalClass
     * @class Virtual bin for eval() evaluation
     * @param {Template} t template
     * @private
     */
    EvalClass = function (t) {
        this.__templ = t;
    };

    /**
     * Evaluate expression (template content)
     * @param {object} $T data
     * @param {object} $P parameters
     * @param {object} $Q element
     * @param {String} __value Template content
     * @return {String}
     */
    EvalClass.prototype.evaluateContent = function ($T, $P, $Q, __value) {
        try {
            var result = eval(__value);

            if(jQuery.isFunction(result)) {
                if(this.__templ.settings.disallow_functions || !this.__templ.settings.runnable_functions) {
                    return '';
                }
                result = result($T, $P, $Q);
            }
            return (result === undefined) ? ("") : (String(result));
        } catch(e) {
            if(Template.DEBUG_MODE) {
                if(e instanceof JTException) {
                    e.type = "subtemplate";
                }
                throw e;
            }
            return "";
        }
    };

    /**
     * Evaluate expression (simple eval)
     * @param {object} $T data
     * @param {object} $P parameters
     * @param {object} $Q element
     * @param {String} __value content to evaluate
     * @return {String}
     */
    EvalClass.prototype.evaluate = function ($T, $P, $Q, __value) {
        return eval(__value);
    };

    /**
     * Create a new conditional node.
     * @name opIF
     * @class A class represent: {#if}.
     * @param {object} par parent node
     * @param {Template} templ template
     * @augments BaseArray
     */
    var opIF = function (par, templ) {
        this._parent = par;
        this._templ = templ;
        this._cond = []; //conditions
        this._tree = []; //conditions subtree
        this._curr = null; //current subtree
    };

    /**
     * Add node 'e' to array.
     * @param {BaseNode} e a node
     */
    opIF.prototype.push = function (e) {
        this._curr.push(e);
    };

    /**
     * Get a parent node.
     * @return {BaseNode}
     */
    opIF.prototype.getParent = function () {
        return this._parent;
    };

    /**
     * Add condition
     * @param {string} oper content of operator {#..}
     */
    opIF.prototype.addCond = function (oper) {
        oper.match(/\{#(?:else)*if (.*?)\}/);
        this._cond.push(RegExp.$1);
        this._curr = [];
        this._tree.push(this._curr);
    };

    /**
     * Switch to else
     */
    opIF.prototype.switchToElse = function () {
        this._cond.push(true); //else is the last condition and its always true
        this._curr = [];
        this._tree.push(this._curr);
    };

    /**
     * Process node depend on conditional and get the html string.
     * @param {object} d data
     * @param {object} param parameters
     * @param {Element} element a HTML element
     * @param {Number} deep
     * @return {String}
     */
    opIF.prototype.get = function (d, param, element, deep) {
        var ret = ''; //result

        try {
            //foreach condition
            for(var ci=0, cl=this._cond.length; ci<cl; ++ci) {
                //if condition is true
                if(this._templ.getBin().evaluate(d, param, element, this._cond[ci])) {
                    //execute and exit
                    var t = this._tree[ci];
                    for(var i=0, l=t.length; i<l; ++i) {
                        ret += t[i].get(d, param, element, deep);
                    }
                    return ret;
                }
            }
        } catch(e) {
            if(Template.DEBUG_MODE || (e instanceof JTException)) {
                throw e;
            }
        }
        return ret;
    };

    /**
     * Handler for a tag 'FOR'. Create new and return relative opFOREACH object.
     * @name opFORFactory
     * @class Handler for a tag 'FOR'. Create new and return relative opFOREACH object.
     * @param {string} oper content of operator {#..}
     * @param {object} par parent node
     * @param {Template} template a pointer to Template object
     * @return {opFOREACH}
     */
    opFORFactory = function (oper, par, template) {
        //create operator FOREACH with function as iterator
        if(oper.match(/\{#for (\w+?) *= *(\S+?) +to +(\S+?) *(?:step=(\S+?))*\}/)) {
            var f = new opFOREACH(null, par, template);
            f._name = RegExp.$1;
            f._option = {'begin': (RegExp.$2 || 0), 'end': (RegExp.$3 || -1), 'step': (RegExp.$4 || 1), 'extData': '$T'};
            f._runFunc = (function (i){return i;});
            return f;
        } else {
            throw new Error('jTemplates: Operator failed "find": ' + oper);
        }
    };

    /**
     * Create a new loop node.
     * @name opFOREACH
     * @class A class represent: {#foreach}.
     * @param {string} oper content of operator {#..}
     * @param {object} par parent node
     * @param {Template} template a pointer to Template object
     * @augments BaseArray
     */
    var opFOREACH = function (oper, par, template) {
        this._parent = par;
        this._template = template;
        if(oper != null) {
            oper.match(/\{#foreach +(.+?) +as +(\w+?)( .+)*\}/);
            this._arg = RegExp.$1;
            this._name = RegExp.$2;
            this._option = RegExp.$3 || null;
            this._option = TemplateUtils.optionToObject(this._option);
        }

        this._onTrue = [];
        this._onFalse = [];
        this._currentState = this._onTrue;
        //this._runFunc = null;
    };

    /**
     * Add node 'e' to array.
     * @param {BaseNode} e
     */
    opFOREACH.prototype.push = function (e) {
        this._currentState.push(e);
    };

    /**
     * Get a parent node.
     * @return {BaseNode}
     */
    opFOREACH.prototype.getParent = function () {
        return this._parent;
    };

    /**
     * Switch from collection onTrue to onFalse.
     */
    opFOREACH.prototype.switchToElse = function () {
        this._currentState = this._onFalse;
    };

    /**
     * Process loop and get the html string.
     * @param {object} d data
     * @param {object} param parameters
     * @param {Element} element a HTML element
     * @param {Number} deep
     * @return {String}
     */
    opFOREACH.prototype.get = function (d, param, element, deep) {
        try {
            //array of elements in foreach (or function)
            var fcount = (this._runFunc === undefined) ? (this._template.getBin().evaluate(d, param, element, this._arg)) : (this._runFunc);
            if(fcount === $) {
                throw new Error("jTemplate: Variable '$' cannot be used as loop-function");
            }
            var key = [];	//only for objects
            var mode = typeof fcount;
            if(mode == 'object') {
                //transform object to array
                var arr = [];
                jQuery.each(fcount, function (k, v) {
                    key.push(k);
                    arr.push(v);
                });
                fcount = arr;
            }
            //setup primary iterator, iterator can get data from options (using by operator FOR) or from data "$T"
            var extData = (this._option.extData !== undefined) ? (this._template.getBin().evaluate(d, param, element, this._option.extData)) : ((d != null) ? (d) : ({}));
            if(extData == null) {
                extData = {};
            }
            //start, end and step
            var s = Number(this._template.getBin().evaluate(d, param, element, this._option.begin) || 0), e;	//start, end
            var step = Number(this._template.getBin().evaluate(d, param, element, this._option.step) || 1);
            if(mode != 'function') {
                e = fcount.length;
            } else {
                if(this._option.end === undefined || this._option.end === null) {
                    e = Number.MAX_VALUE;
                } else {
                    e = Number(this._template.getBin().evaluate(d, param, element, this._option.end)) + ((step>0) ? (1) : (-1));
                }
            }
            var ret = '';	//result string
            var i,l;	//local iterators

            if(this._option.count) {
                //limit number of loops
                var tmp = s + Number(this._template.getBin().evaluate(d, param, element, this._option.count));
                e = (tmp > e) ? (e) : (tmp);
            }

            if((e>s && step>0) || (e<s && step<0)) {
                var iteration = 0;
                var _total = (mode != 'function') ? (Math.ceil((e-s)/step)) : undefined;
                var ckey, cval;	//current key, current value
                var loopCounter = 0;
                for(; ((step>0) ? (s<e) : (s>e)); s+=step, ++iteration, ++loopCounter) {
                    if(Template.DEBUG_MODE && loopCounter > Template.FOREACH_LOOP_LIMIT) {
                        throw new Error("jTemplate: Foreach loop limit was exceed");
                    }
                    ckey = key[s];
                    if(mode != 'function') {
                        cval = fcount[s];  //get value from array
                    } else {
                        cval = fcount(s);  //calc function
                        //if no result from function then stop foreach
                        if(cval === undefined || cval === null) {
                            break;
                        }
                    }
                    if((typeof cval == 'function') && (this._template.settings.disallow_functions || !this._template.settings.runnable_functions)) {
                        continue;
                    }
                    if((mode == 'object') && (ckey in Object) && (cval === Object[ckey])) {
                        continue;
                    }
                    //backup on value
                    var prevValue = extData[this._name];
                    //set iterator properties
                    extData[this._name] = cval;
                    extData[this._name + '$index'] = s;
                    extData[this._name + '$iteration'] = iteration;
                    extData[this._name + '$first'] = (iteration === 0);
                    extData[this._name + '$last'] = (s+step >= e);
                    extData[this._name + '$total'] = _total;
                    extData[this._name + '$key'] = (ckey !== undefined && ckey.constructor == String) ? (this._template.f_escapeString(ckey)) : (ckey);
                    extData[this._name + '$typeof'] = typeof cval;
                    for(i=0, l=this._onTrue.length; i<l; ++i) {
                        try {
                            ret += this._onTrue[i].get(extData, param, element, deep);
                        } catch(ex) {
                            if(ex instanceof JTException) {
                                switch(ex.type) {
                                    case 'continue':
                                        i = l; //force skip to next node
                                        break;
                                    case 'break':
                                        i = l;  //force skip to next node
                                        s = e;  //force skip outsite foreach
                                        break;
                                    default:
                                        throw ex;
                                }
                            } else {
                                throw ex;
                            }
                        }
                    }
                    //restore values
                    delete extData[this._name + '$index'];
                    delete extData[this._name + '$iteration'];
                    delete extData[this._name + '$first'];
                    delete extData[this._name + '$last'];
                    delete extData[this._name + '$total'];
                    delete extData[this._name + '$key'];
                    delete extData[this._name + '$typeof'];
                    delete extData[this._name];
                    extData[this._name] = prevValue;
                }
            } else {
                //no items to loop ("foreach->else")
                for(i=0, l=this._onFalse.length; i<l; ++i) {
                    ret += this._onFalse[i].get(d, param, element, deep);
                }
            }
            return ret;
        } catch(e) {
            if(Template.DEBUG_MODE || (e instanceof JTException)) {
                throw e;
            }
            return "";
        }
    };

    /**
     * Template-control exceptions
     * @name JTException
     * @class A class used internals for a template-control exceptions
     * @param type {string} Type of exception
     * @augments Error
     * @augments BaseNode
     */
    var JTException = function (type) {
        this.type = type;
    };
    JTException.prototype = Error;

    /**
     * Throw a template-control exception
     * @throws It throws itself
     */
    JTException.prototype.get = function (d) {
        throw this;
    };

    /**
     * Create a new entry for included template.
     * @name Include
     * @class A class represent: {#include}.
     * @param {string} oper content of operator {#..}
     * @param {array} includes
     * @param {Template} templ template
     * @augments BaseNode
     */
    var Include = function (oper, includes, templ) {
        oper.match(/\{#include (.*?)(?: root=(.*?))?\}/);
        this._template = includes[RegExp.$1];
        if(this._template == undefined) {
            if(Template.DEBUG_MODE) {
                throw new Error('jTemplates: Cannot find include: ' + RegExp.$1);
            }
        }
        this._root = RegExp.$2;
        this._mainTempl = templ;
    };

    /**
     * Run method get on included template.
     * @param {object} d data
     * @param {object} param parameters
     * @param {Element} element a HTML element
     * @param {Number} deep
     * @return {String}
     */
    Include.prototype.get = function (d, param, element, deep) {
        try {
            //run a subtemplates with a new root node
            return this._template.get(this._mainTempl.getBin().evaluate(d, param, element, this._root), param, element, deep);
        } catch(e) {
            if(Template.DEBUG_MODE || (e instanceof JTException)) {
                throw e;
            }
        }
        return '';
    };

    /**
     * Create new node for {#param}.
     * @name UserParam
     * @class A class represent: {#param}.
     * @param {string} oper content of operator {#..}
     * @param {Template} templ template
     * @augments BaseNode
     */
    var UserParam = function (oper, templ) {
        oper.match(/\{#param name=(\w*?) value=(.*?)\}/);
        this._name = RegExp.$1;
        this._value = RegExp.$2;
        this._templ = templ;
    };

    /**
     * Return value of selected parameter.
     * @param {object} d data
     * @param {object} param parameters
     * @param {Element} element a HTML element
     * @param {Number} deep
     * @return {String} empty string
     */
    UserParam.prototype.get = function (d, param, element, deep) {
        try {
            param[this._name] = this._templ.getBin().evaluate(d, param, element, this._value);
        } catch(e) {
            if(Template.DEBUG_MODE || (e instanceof JTException)) {
                throw e;
            }
            param[this._name] = undefined;
        }
        return '';
    };

    /**
     * Create new node for {#var}.
     * @name UserVariable
     * @class A class represent: {#var}.
     * @param {string} oper content of operator {#..}
     * @param {Template} templ template
     * @augments BaseNode
     */
    var UserVariable = function (oper, templ) {
        oper.match(/\{#var (.*?)\}/);
        this._id = RegExp.$1;
        this._templ = templ;
    };

    /**
     * Return value of selected variable.
     * @param {object} d data
     * @param {object} param parameters
     * @param {Element} element a HTML element
     * @param {Number} deep
     * @return {String} calling of function ReturnRefValue (as text string)
     */
    UserVariable.prototype.get = function (d, param, element, deep) {
        try {
            if(element == undefined) {
                return "";
            }
            var obj = this._templ.getBin().evaluate(d, param, element, this._id);
            var refobj = jQuery.data(element, "jTemplatesRef");
            if(refobj == undefined) {
                refobj = {guid:(++Template.guid), d:[]};
            }
            var i = refobj.d.push(obj);
            jQuery.data(element, "jTemplatesRef", refobj);
            return "(TemplateUtils.ReturnRefValue(this," + refobj.guid + "," + (i-1) + "))";
        } catch(e) {
            if(Template.DEBUG_MODE || (e instanceof JTException)) {
                throw e;
            }
            return '';
        }
    };

    /**
     * Create a new cycle node.
     * @name Cycle
     * @class A class represent: {#cycle}.
     * @param {string} oper content of operator {#..}
     * @augments BaseNode
     */
    var Cycle = function (oper) {
        oper.match(/\{#cycle values=(.*?)\}/);
        this._values = eval(RegExp.$1);
        this._length = this._values.length;
        if(this._length <= 0) {
            throw new Error('jTemplates: no elements for cycle');
        }
        this._index = 0;
        this._lastSessionID = -1;
    };

    /**
     * Do a step on cycle and return value.
     * @param {object} d data
     * @param {object} param parameters
     * @param {Element} element a HTML element
     * @param {Number} deep
     * @return {String}
     */
    Cycle.prototype.get = function (d, param, element, deep) {
        var sid = jQuery.data(element, 'jTemplateSID');
        if(sid != this._lastSessionID) {
            this._lastSessionID = sid;
            this._index = 0;
        }
        var i = this._index++ % this._length;
        return this._values[i];
    };


    /**
     * Add a Template to HTML Elements.
     * @param {Template/string} s a Template or a template string
     * @param {array} [includes] Array of included templates.
     * @param {object} [settings] Settings (see Template)
     * @return {jQuery} chainable jQuery class
     * @memberOf jQuery.fn
     */
    jQuery.fn.setTemplate = function (s, includes, settings) {
        return jQuery(this).each(function () {
            var t = (s && s.constructor == Template) ? s : new Template(s, includes, settings);
            jQuery.data(this, 'jTemplate', t);
            jQuery.data(this, 'jTemplateSID', 0);
        });
    };

    /**
     * Add a Template (from URL) to HTML Elements.
     * @param {string} url_ URL to template
     * @param {array} [includes] Array of included templates.
     * @param {object} [settings] Settings (see Template)
     * @return {jQuery} chainable jQuery class
     * @memberOf jQuery.fn
     */
    jQuery.fn.setTemplateURL = function (url_, includes, settings) {
        var s = jQuery.ajax({
            url: url_,
            dataType: 'text',
            async: false,
            type: 'GET'
        }).responseText;

        return jQuery(this).setTemplate(s, includes, settings);
    };

    /**
     * Create a Template from element's content.
     * @param {string} elementName an ID of element
     * @param {array} [includes] Array of included templates.
     * @param {object} [settings] Settings (see Template)
     * @return {jQuery} chainable jQuery class
     * @memberOf jQuery.fn
     */
    jQuery.fn.setTemplateElement = function (elementName, includes, settings) {
        var el = elementName.jquery?elementName:jQuery('#' + elementName);
        var s = el.val();
        if(s == null||s == "") {
            s = el.html();
            s = s.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        }

        s = jQuery.trim(s);
        s = s.replace(/^<\!\[CDATA\[([\s\S]*)\]\]>$/im, '$1');
        s = s.replace(/^<\!--([\s\S]*)-->$/im, '$1');

        return jQuery(this).setTemplate(s, includes, settings);
    };

    /**
     * Check it HTML Elements have a template. Return count of templates.
     * @return {number} Number of templates.
     * @memberOf jQuery.fn
     */
    jQuery.fn.hasTemplate = function () {
        var count = 0;
        jQuery(this).each(function () {
            if(jQuery.getTemplate(this)) {
                ++count;
            }
        });
        return count;
    };

    /**
     * Remote Template from HTML Element(s)
     * @return {jQuery} chainable jQuery class
     */
    jQuery.fn.removeTemplate = function () {
        jQuery(this).processTemplateStop();
        return jQuery(this).each(function () {
            jQuery.removeData(this, 'jTemplate');
        });
    };

    /**
     * Set to parameter 'name' value 'value'.
     * @param {string} name
     * @param {object} value
     * @return {jQuery} chainable jQuery class
     * @memberOf jQuery.fn
     */
    jQuery.fn.setParam = function (name, value) {
        return jQuery(this).each(function () {
            var t = jQuery.getTemplate(this);
            if(t != null) {
                t.setParam(name, value);
            } else if(Template.DEBUG_MODE) {
                throw new Error('jTemplates: Template is not defined.');
            }
        });
    };

    /**
     * Process template using data 'd' and parameters 'param'. Update HTML code.
     * @param {object} d data
     * @param {object} [param] parameters
     * @option {object} [options] internal use only
     * @return {jQuery} chainable jQuery class
     * @memberOf jQuery.fn
     */
    jQuery.fn.processTemplate = function (d, param, options) {
        return jQuery(this).each(function () {
            var t = jQuery.getTemplate(this);
            if(t != null) {
                if(options != undefined && options.StrToJSON) {
                    d = t.f_parseJSON(d);
                }
                jQuery.data(this, 'jTemplateSID', jQuery.data(this, 'jTemplateSID') + 1);
                jQuery(this).html(t.get(d, param, this, 0));
            } else if(Template.DEBUG_MODE) {
                throw new Error('jTemplates: Template is not defined.');
            }
        });
    };

    /**
     * Process template using data from URL 'url_' (only format JSON) and parameters 'param'. Update HTML code.
     * @param {string} url_ URL to data (in JSON)
     * @param {object} [param] parameters
     * @param {object} options options (over ajaxSettings) and callbacks
     * @return {jQuery} chainable jQuery class
     * @memberOf jQuery.fn
     */
    jQuery.fn.processTemplateURL = function (url_, param, options) {
        var that = this;

        var o = jQuery.extend({cache: false}, jQuery.ajaxSettings);
        o = jQuery.extend(o, options);

        jQuery.ajax({
            url: url_,
            type: o.type,
            data: o.data,
            dataFilter: o.dataFilter,
            async: o.async,
            headers: o.headers,
            cache: o.cache,
            timeout: o.timeout,
            dataType: 'text',
            success: function (d) {
                var r = jQuery(that).processTemplate(d, param, {StrToJSON:true});
                if(o.on_success) {
                    o.on_success(r);
                }
            },
            error: o.on_error,
            complete: o.on_complete
        });
        return this;
    };

    /**
     * Create new Updater.
     * @name Updater
     * @class This class is used for 'Live Refresh!'.
     * @param {string} url A destination URL
     * @param {object} param Parameters (for template)
     * @param {number} interval Time refresh interval
     * @param {object} args Additional URL parameters (in URL alter ?) as assoc array.
     * @param {array} objs An array of HTMLElement which will be modified by Updater.
     * @param {object} options options and callbacks
     */
    var Updater = function (url, param, interval, args, objs, options) {
        this._url = url;
        this._param = param;
        this._interval = interval;
        this._args = args;
        this.objs = objs;
        this.timer = null;
        this._options = options || {};

        var that = this;
        jQuery(objs).each(function () {
            jQuery.data(this, 'jTemplateUpdater', that);
        });
        this.run();
    };

    /**
     * Create new HTTP request to server, get data (as JSON) and send it to templates. Also check does HTMLElements still exists in Document.
     */
    Updater.prototype.run = function () {
        //remove deleted node
        this.objs = jQuery.grep(this.objs, function (elem) {
            return (jQuery.contains(document.body, elem.jquery ? elem[0] : elem));
        });
        //if no node then do nothing
        if(this.objs.length === 0) {
            return;
        }
        //ajax call
        var that = this;
        jQuery.ajax({
            url: this._url,
            dataType: 'text',
            data: this._args,
            cache: false,
            headers: that._options.headers,
            success: function (d) {
                try {
                    var r = jQuery(that.objs).processTemplate(d, that._param, {StrToJSON:true});
                    if(that._options.on_success) {
                        that._options.on_success(r); //callback
                    }
                } catch(ex) {}
            }
        });
        //schedule next run
        this.timer = setTimeout(function (){that.run();}, this._interval);
    };

    /**
     * Start 'Live Refresh!'.
     * @param {string} url A destination URL
     * @param {object} param Parameters (for template)
     * @param {number} interval Time refresh interval
     * @param {object} args Additional URL parameters (in URL alter ?) as assoc array.
     * @param {object} options options and callbacks
     * @return {Updater} an Updater object
     * @memberOf jQuery.fn
     */
    jQuery.fn.processTemplateStart = function (url, param, interval, args, options) {
        return new Updater(url, param, interval, args, this, options);
    };

    /**
     * Stop 'Live Refresh!'.
     * @return {jQuery} chainable jQuery class
     * @memberOf jQuery.fn
     */
    jQuery.fn.processTemplateStop = function () {
        return jQuery(this).each(function () {
            var updater = jQuery.data(this, 'jTemplateUpdater');
            if(updater == null) {
                return;
            }
            var that = this;
            updater.objs = jQuery.grep(updater.objs, function (o) {
                return o != that;
            });
            jQuery.removeData(this, 'jTemplateUpdater');
        });
    };

    jQuery.extend(/** @scope jQuery.prototype */{
        /**
         * Create new Template.
         * @param {string} s A template string (like: "Text: {$T.txt}.").
         * @param {array} includes Array of included templates.
         * @param {object} settings Settings. (see Template)
         * @return {Template}
         */
        createTemplate: function (s, includes, settings) {
            return new Template(s, includes, settings);
        },

        /**
         * Create new Template from URL.
         * @param {string} url_ URL to template
         * @param {array} includes Array of included templates.
         * @param {object} settings Settings. (see Template)
         * @return {Template}
         */
        createTemplateURL: function (url_, includes, settings) {
            var s = jQuery.ajax({
                url: url_,
                dataType: 'text',
                async: false,
                type: 'GET'
            }).responseText;

            return new Template(s, includes, settings);
        },

        /**
         * Get a Template for HTML node
         * @param {Element} HTML node
         * @return {Template} a Template or "undefined"
         */
        getTemplate: function (element) {
            return jQuery.data(element, 'jTemplate');
        },

        /**
         * Process template and return text content.
         * @param {Template} template A Template
         * @param {object} data data
         * @param {object} param parameters
         * @return {string} Content of template
         */
        processTemplateToText: function (template, data, parameter) {
            return template.get(data, parameter, undefined, 0);
        },

        /**
         * Set Debug Mode
         * @param {Boolean} value
         */
        jTemplatesDebugMode: function (value) {
            Template.DEBUG_MODE = value;
        }
    });

})(jQuery);};
/*!
 * artTemplate - Template Engine
 * https://github.com/aui/artTemplate
 * Released under the MIT, BSD, and GPL Licenses
 */

!(function () {


    /**
     * 模板引擎
     * @name    template
     * @param   {String}            模板名
     * @param   {Object, String}    数据。如果为字符串则编译并缓存编译结果
     * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
     */
    var template = function (filename, content) {
        return typeof content === 'string'
            ?   compile(content, {
            filename: filename
        })
            :   renderFile(filename, content);
    };


    template.version = '3.0.0';


    /**
     * 设置全局配置
     * @name    template.config
     * @param   {String}    名称
     * @param   {Any}       值
     */
    template.config = function (name, value) {
        defaults[name] = value;
    };



    var defaults = template.defaults = {
        openTag: '<%',    // 逻辑语法开始标签
        closeTag: '%>',   // 逻辑语法结束标签
        escape: true,     // 是否编码输出变量的 HTML 字符
        cache: true,      // 是否开启缓存（依赖 options 的 filename 字段）
        compress: false,  // 是否压缩输出
        parser: null      // 自定义语法格式器 @see: template-syntax.js
    };


    var cacheStore = template.cache = {};


    /**
     * 渲染模板
     * @name    template.render
     * @param   {String}    模板
     * @param   {Object}    数据
     * @return  {String}    渲染好的字符串
     */
    template.render = function (source, options) {
        return compile(source, options);
    };


    /**
     * 渲染模板(根据模板名)
     * @name    template.render
     * @param   {String}    模板名
     * @param   {Object}    数据
     * @return  {String}    渲染好的字符串
     */
    var renderFile = template.renderFile = function (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
                filename: filename,
                name: 'Render Error',
                message: 'Template not found'
            });
        return data ? fn(data) : fn;
    };


    /**
     * 获取编译缓存（可由外部重写此方法）
     * @param   {String}    模板名
     * @param   {Function}  编译好的函数
     */
    template.get = function (filename) {

        var cache;

        if (cacheStore[filename]) {
            // 使用内存缓存
            cache = cacheStore[filename];
        } else if (typeof document === 'object') {
            // 加载模板并编译
            var elem = document.getElementById(filename);

            if (elem) {
                var source = (elem.value || elem.innerHTML)
                    .replace(/^\s*|\s*$/g, '');
                cache = compile(source, {
                    filename: filename
                });
            }
        }

        return cache;
    };


    var toString = function (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    var escapeFn = function (s) {
        return escapeMap[s];
    };

    var escapeHTML = function (content) {
        return toString(content)
            .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function (obj) {
            return ({}).toString.call(obj) === '[object Array]';
        };


    var each = function (data, callback) {
        var i, len;
        if (isArray(data)) {
            for (i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    var utils = template.utils = {

        $helpers: {},

        $include: renderFile,

        $string: toString,

        $escape: escapeHTML,

        $each: each

    };/**
     * 添加模板辅助方法
     * @name    template.helper
     * @param   {String}    名称
     * @param   {Function}  方法
     */
    template.helper = function (name, helper) {
        helpers[name] = helper;
    };

    var helpers = template.helpers = utils.$helpers;




    /**
     * 模板错误事件（可由外部重写此方法）
     * @name    template.onerror
     * @event
     */
    template.onerror = function (e) {
        var message = 'Template Error\n\n';
        for (var name in e) {
            message += '<' + name + '>\n' + e[name] + '\n\n';
        }

        if (typeof console === 'object') {
            console.error(message);
        }
    };


// 模板调试器
    var showDebugInfo = function (e) {

        template.onerror(e);

        return function () {
            return '{Template Error}';
        };
    };


    /**
     * 编译模板
     * 2012-6-6 @TooBug: define 方法名改为 compile，与 Node Express 保持一致
     * @name    template.compile
     * @param   {String}    模板字符串
     * @param   {Object}    编译选项
     *
     *      - openTag       {String}
     *      - closeTag      {String}
     *      - filename      {String}
     *      - escape        {Boolean}
     *      - compress      {Boolean}
     *      - debug         {Boolean}
     *      - cache         {Boolean}
     *      - parser        {Function}
     *
     * @return  {Function}  渲染方法
     */
    var compile = template.compile = function (source, options) {

        // 合并默认配置
        options = options || {};
        for (var name in defaults) {
            if (options[name] === undefined) {
                options[name] = defaults[name];
            }
        }


        var filename = options.filename;


        try {

            var Render = compiler(source, options);

        } catch (e) {

            e.filename = filename || 'anonymous';
            e.name = 'Syntax Error';

            return showDebugInfo(e);

        }


        // 对编译结果进行一次包装

        function render (data) {

            try {

                return new Render(data, filename) + '';

            } catch (e) {

                // 运行时出错后自动开启调试模式重新编译
                if (!options.debug) {
                    options.debug = true;
                    return compile(source, options)(data);
                }

                return showDebugInfo(e)();

            }

        }


        render.prototype = Render.prototype;
        render.toString = function () {
            return Render.toString();
        };


        if (filename && options.cache) {
            cacheStore[filename] = render;
        }


        return render;

    };




// 数组迭代
    var forEach = utils.$each;


// 静态分析模板变量
    var KEYWORDS =
        // 关键字
        'break,case,catch,continue,debugger,default,delete,do,else,false'
        + ',finally,for,function,if,in,instanceof,new,null,return,switch,this'
        + ',throw,true,try,typeof,var,void,while,with'

            // 保留字
        + ',abstract,boolean,byte,char,class,const,double,enum,export,extends'
        + ',final,float,goto,implements,import,int,interface,long,native'
        + ',package,private,protected,public,short,static,super,synchronized'
        + ',throws,transient,volatile'

            // ECMA 5 - use strict
        + ',arguments,let,yield'

        + ',undefined';

    var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g;
    var SPLIT_RE = /[^\w$]+/g;
    var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
    var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
    var BOUNDARY_RE = /^,+|,+$/g;
    var SPLIT2_RE = /^$|,+/;


// 获取变量
    function getVariable (code) {
        return code
            .replace(REMOVE_RE, '')
            .replace(SPLIT_RE, ',')
            .replace(KEYWORDS_RE, '')
            .replace(NUMBER_RE, '')
            .replace(BOUNDARY_RE, '')
            .split(SPLIT2_RE);
    };


// 字符串转义
    function stringify (code) {
        return "'" + code
                // 单引号与反斜杠转义
                .replace(/('|\\)/g, '\\$1')
                // 换行符转义(windows + linux)
                .replace(/\r/g, '\\r')
                .replace(/\n/g, '\\n') + "'";
    }


    function compiler (source, options) {

        var debug = options.debug;
        var openTag = options.openTag;
        var closeTag = options.closeTag;
        var parser = options.parser;
        var compress = options.compress;
        var escape = options.escape;



        var line = 1;
        var uniq = {$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1};



        var isNewEngine = ''.trim;// '__proto__' in {}
        var replaces = isNewEngine
            ? ["$out='';", "$out+=", ";", "$out"]
            : ["$out=[];", "$out.push(", ");", "$out.join('')"];

        var concat = isNewEngine
            ? "$out+=text;return $out;"
            : "$out.push(text);";

        var print = "function(){"
            +      "var text=''.concat.apply('',arguments);"
            +       concat
            +  "}";

        var include = "function(filename,data){"
            +      "data=data||$data;"
            +      "var text=$utils.$include(filename,data,$filename);"
            +       concat
            +   "}";

        var headerCode = "'use strict';"
            + "var $utils=this,$helpers=$utils.$helpers,"
            + (debug ? "$line=0," : "");

        var mainCode = replaces[0];

        var footerCode = "return new String(" + replaces[3] + ");"

        // html与逻辑语法分离
        forEach(source.split(openTag), function (code) {
            code = code.split(closeTag);

            var $0 = code[0];
            var $1 = code[1];

            // code: [html]
            if (code.length === 1) {

                mainCode += html($0);

                // code: [logic, html]
            } else {

                mainCode += logic($0);

                if ($1) {
                    mainCode += html($1);
                }
            }


        });

        var code = headerCode + mainCode + footerCode;

        // 调试语句
        if (debug) {
            code = "try{" + code + "}catch(e){"
            +       "throw {"
            +           "filename:$filename,"
            +           "name:'Render Error',"
            +           "message:e.message,"
            +           "line:$line,"
            +           "source:" + stringify(source)
            +           ".split(/\\n/)[$line-1].replace(/^\\s+/,'')"
            +       "};"
            + "}";
        }



        try {


            var Render = new Function("$data", "$filename", code);
            Render.prototype = utils;

            return Render;

        } catch (e) {
            e.temp = "function anonymous($data,$filename) {" + code + "}";
            throw e;
        }




        // 处理 HTML 语句
        function html (code) {

            // 记录行号
            line += code.split(/\n/).length - 1;

            // 压缩多余空白与注释
            if (compress) {
                code = code
                    .replace(/\s+/g, ' ')
                    .replace(/<!--[\w\W]*?-->/g, '');
            }

            if (code) {
                code = replaces[1] + stringify(code) + replaces[2] + "\n";
            }

            return code;
        }


        // 处理逻辑语句
        function logic (code) {

            var thisLine = line;

            if (parser) {

                // 语法转换插件钩子
                code = parser(code, options);

            } else if (debug) {

                // 记录行号
                code = code.replace(/\n/g, function () {
                    line ++;
                    return "$line=" + line +  ";";
                });

            }


            // 输出语句. 编码: <%=value%> 不编码:<%=#value%>
            // <%=#value%> 等同 v2.0.3 之前的 <%==value%>
            if (code.indexOf('=') === 0) {

                var escapeSyntax = escape && !/^=[=#]/.test(code);

                code = code.replace(/^=[=#]?|[\s;]*$/g, '');

                // 对内容编码
                if (escapeSyntax) {

                    var name = code.replace(/\s*\([^\)]+\)/, '');

                    // 排除 utils.* | include | print

                    if (!utils[name] && !/^(include|print)$/.test(name)) {
                        code = "$escape(" + code + ")";
                    }

                    // 不编码
                } else {
                    code = "$string(" + code + ")";
                }


                code = replaces[1] + code + replaces[2];

            }

            if (debug) {
                code = "$line=" + thisLine + ";" + code;
            }

            // 提取模板中的变量名
            forEach(getVariable(code), function (name) {

                // name 值可能为空，在安卓低版本浏览器下
                if (!name || uniq[name]) {
                    return;
                }

                var value;

                // 声明模板变量
                // 赋值优先级:
                // [include, print] > utils > helpers > data
                if (name === 'print') {

                    value = print;

                } else if (name === 'include') {

                    value = include;

                } else if (utils[name]) {

                    value = "$utils." + name;

                } else if (helpers[name]) {

                    value = "$helpers." + name;

                } else {

                    value = "$data." + name;
                }

                headerCode += name + "=" + value + ",";
                uniq[name] = true;


            });

            return code + "\n";
        }


    };



// 定义模板引擎的语法


    defaults.openTag = '{{';
    defaults.closeTag = '}}';


    var filtered = function (js, filter) {
        var parts = filter.split(':');
        var name = parts.shift();
        var args = parts.join(':') || '';

        if (args) {
            args = ', ' + args;
        }

        return '$helpers.' + name + '(' + js + args + ')';
    }


    defaults.parser = function (code, options) {

        // var match = code.match(/([\w\$]*)(\b.*)/);
        // var key = match[1];
        // var args = match[2];
        // var split = args.split(' ');
        // split.shift();

        code = code.replace(/^\s/, '');

        var split = code.split(' ');
        var key = split.shift();
        var args = split.join(' ');



        switch (key) {

            case 'if':

                code = 'if(' + args + '){';
                break;

            case 'else':

                if (split.shift() === 'if') {
                    split = ' if(' + split.join(' ') + ')';
                } else {
                    split = '';
                }

                code = '}else' + split + '{';
                break;

            case '/if':

                code = '}';
                break;

            case 'each':

                var object = split[0] || '$data';
                var as     = split[1] || 'as';
                var value  = split[2] || '$value';
                var index  = split[3] || '$index';

                var param   = value + ',' + index;

                if (as !== 'as') {
                    object = '[]';
                }

                code =  '$each(' + object + ',function(' + param + '){';
                break;

            case '/each':

                code = '});';
                break;

            case 'echo':

                code = 'print(' + args + ');';
                break;

            case 'print':
            case 'include':

                code = key + '(' + split.join(',') + ');';
                break;

            default:

                // 过滤器（辅助方法）
                // {{value | filterA:'abcd' | filterB}}
                // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
                // TODO: {{ddd||aaa}} 不包含空格
                if (/^\s*\|\s*[\w\$]/.test(args)) {

                    var escape = true;

                    // {{#value | link}}
                    if (code.indexOf('#') === 0) {
                        code = code.substr(1);
                        escape = false;
                    }

                    var i = 0;
                    var array = code.split('|');
                    var len = array.length;
                    var val = array[i++];

                    for (; i < len; i ++) {
                        val = filtered(val, array[i]);
                    }

                    code = (escape ? '=' : '=#') + val;

                    // 即将弃用 {{helperName value}}
                } else if (template.helpers[key]) {

                    code = '=#' + key + '(' + split.join(',') + ');';

                    // 内容直接输出 {{value}}
                } else {

                    code = '=' + code;
                }

                break;
        }


        return code;
    };



// RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function() {
            return template;
        });

// NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = template;
    } else {
        this.template = template;
    }

})();

(function($){

    var rotateLeft = function(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    var addUnsigned = function(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    var F = function(x, y, z) {
        return (x & y) | ((~ x) & z);
    }

    var G = function(x, y, z) {
        return (x & z) | (y & (~ z));
    }

    var H = function(x, y, z) {
        return (x ^ y ^ z);
    }

    var I = function(x, y, z) {
        return (y ^ (x | (~ z)));
    }

    var FF = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var GG = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var HH = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var II = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var convertToWordArray = function(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWordsTempOne = lMessageLength + 8;
        var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
        var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    var wordToHex = function(lValue) {
        var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValueTemp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
        }
        return WordToHexValue;
    };

    var uTF8Encode = function(string) {
        if(typeof string!="string") string=JSON.stringify(string);
        string = string.replace(/\x0d\x0a/g, "\x0a");
        var output = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                output += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                output += String.fromCharCode((c >> 6) | 192);
                output += String.fromCharCode((c & 63) | 128);
            } else {
                output += String.fromCharCode((c >> 12) | 224);
                output += String.fromCharCode(((c >> 6) & 63) | 128);
                output += String.fromCharCode((c & 63) | 128);
            }
        }
        return output;
    };

    $.extend({
        md5: function(string) {
            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11=7, S12=12, S13=17, S14=22;
            var S21=5, S22=9 , S23=14, S24=20;
            var S31=4, S32=11, S33=16, S34=23;
            var S41=6, S42=10, S43=15, S44=21;
            string = uTF8Encode(string);
            x = convertToWordArray(string);
            a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
            for (k = 0; k < x.length; k += 16) {
                AA = a; BB = b; CC = c; DD = d;
                a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
                b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
                b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
                a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
                d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
                c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
                c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
                c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
                b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
                a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
                d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
                c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
                a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
                a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
                b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
                d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD);
            }
            var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
            return tempValue.toLowerCase();
        }
    });
})(jQuery);

/****************************************project lib****************************************/
/**
 *  jQuery.ajax wrapper
 */
(function($){
    /**
     * XHR is only wrapper Deferred now , can do some special things
     * @param xhr
     * @param options
     * @constructor
     */
    var XHR=function(xhr,options){
        this.isAsync=function(){
            return options.async;
        };
        if(options&&!options.async){
            this.data=function(){
                return xhr&&xhr.getData();
            };
        }
        this.then=function(fn){
            xhr&&xhr.then(fn);
            return this;
        };
        this.success=function(fn){
            xhr&&xhr.success(fn);
            return this;
        };
        this.error=function(fn){
            xhr&&xhr.error(fn);
            return this;
        };
        this.fail=function(fn){
            xhr&&xhr.fail(fn);
            return this;
        };
    };
    var _AJAX={
        _type:{
            GET:"get",
            POST:"post",
            PUT:"put",
            DELETE:"delete"
        },
        _defaultCfg:{
            dataType:"json",
            contentType:"application/x-www-form-urlencoded;charset=UTF-8"
        },
        _ajax:function(options,type,async){
            var opts=$.extend(true,{},this._defaultCfg,options,{type:type,async:async,data:{
                _t:Date.now()
            }});
            var xhr=$.ajax(opts);
            if(!async){
                xhr.getData=function(){
                    var result=null;
                    xhr.success(function(data){
                        result=data;
                    });
                    return result;
                };
            }
            return new XHR(xhr,opts);
        },
        _get:function(options,async){
            return this._ajax(options,this._type.GET,async);
        },
        _post:function(options,async){
            return this._ajax(options,this._type.POST,async);
        },
        _put:function(options,async){
            return this._ajax(options,this._type.PUT,async);
        },
        _delete:function(options,async){
            return this._ajax(options,this._type.DELETE,async);
        }
    };
    var Ajax=function(async){
        this.get=function(options){
            return _AJAX._get(options,async);
        };
        this.post=function(options){
            return _AJAX._post(options,async);
        };
        this.put=function(options){
            return _AJAX._put(options,async);
        };
        this.del=function(options){
            return _AJAX._delete(options,async);
        };
    };
    $.extend(true,{
        Async:new Ajax(true),
        Sync:new Ajax(false)
    });
})(jQuery);
/**
 * Tools
 */
(function($){
    var UtilsPrototype={
        dateFormat: function (dateString,format) {
            if(!dateString)return "";
            var time = new Date(dateString.replace(/-/g,'/').replace(/T|Z/g,' ').trim());
            var o = {
                "M+": time.getMonth() + 1, //月份
                "d+": time.getDate(), //日
                "h+": time.getHours(), //小时
                "m+": time.getMinutes(), //分
                "s+": time.getSeconds(), //秒
                "q+": Math.floor((time.getMonth() + 3) / 3), //季度
                "S": time.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return format;
        },
        getValue:function(string,key){
            var r = string.match(new RegExp("(^|&)"+key +"=([^&]*)(&|$)"));
            return key?(r?decodeURIComponent(decodeURIComponent(r[2])):null):null;
        },
        getObject:function(string){
            var params={},nameValuePairs=string.split("&");
            for(var i=0;i<nameValuePairs.length;i++){
                if(nameValuePairs[i]=="") break;
                var nameValuePair=nameValuePairs[i].split("=");
                params[nameValuePair[0]]=decodeURIComponent(decodeURIComponent(nameValuePair[1]));
            }
            return params;
        },
        getParam:function(key){
            return this.getValue(window.location.search.substr(1),key);
        },
        getHash:function(key){
            return this.getValue(window.location.hash.substr(1),key);
        },
        getParams:function(){
            return this.getObject(window.location.search.substr(1));
        },
        getHashs:function(){
            return this.getObject(window.location.hash.substr(1));
        }
    };
    var Utils=function(){
        this.dateFormat = function(date,format){
            return UtilsPrototype.dateFormat(date,format);
        };
        this.getParam = function (key) {
            return UtilsPrototype.getParam(key);
        };
        this.getHash = function (key) {
            return UtilsPrototype.getHash(key);
        };
        this.getParams = function () {
            return UtilsPrototype.getParams();
        };
        this.getHashs = function () {
            return UtilsPrototype.getHashs();
        };
    };
    $.extend(true,{
        utils:new Utils()
    });
})(jQuery);
/**
 * jTemplate plugin
 */
(function($){
    var Template={
        render:function($selector,template,data,params){
            try{
                if($selector&&!$selector.jquery) $selector=$($selector);
                if(!$selector.hasTemplate()&&template){
                    if(template.jquery||template.indexOf("#")==0||template.indexOf(".")==0){
                        $selector.setTemplateElement($(template));
                    }else{
                        $selector.setTemplate(template);
                    }
                }
                if(params) typeof params=="function"?$selector.setParam("callback",params):$.each(params,function(i,v){$selector.setParam(i,v);});
                if(typeof data=="string")data=JSON.parse(data);
                $selector.processTemplate(data);
                return true;
            }catch(e){
                return false;
            }
        }
    };
    $.fn.extend(true,{
        renderData:function(template,data,params){
            Template.render($(this),template,data,params);
        }
    });
    $.extend(true,{
        renderData:function($selector,template,data,params){
            Template.render($selector,template,data,params);
        }
    });
})(jQuery);



(function (global) {
    template.compile = compile;

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = template;
    } else if (typeof define === 'function' && define.amd) {
        define(template);
    } else {
        global.template = template;
    }

    // http://www.w3.org/TR/html-markup/syntax.html#void-element
    var SHORT_TAGS = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
        DENY_ATTRS = ['content', 'tag', 'cls', 'class'],

        shortTags = Object.create(null, SHORT_TAGS.reduce(function (o, tag) {
            o[tag] = {};
            return o;
        }, {}));

    function compile(tree) {
        if (typeof tree === 'undefined' || tree === null || typeof tree === 'boolean') {
            return '';
        }
        if (typeof tree === 'string' || typeof tree === 'number') {
            return tree;
        }
        if (Array.isArray(tree)) {
            return tree.map(function (item) {
                return compile(item);
            }).join('');
        }

        var tag = tree.tag || 'div',
            cls = tree.cls || tree['class'],
            attrs = '', key;

        for (key in tree) {
            if (tree.hasOwnProperty(key) && -1 === DENY_ATTRS.indexOf(key)) {
                attrs += ' ' + key + '="' + tree[key] + '"';
            }
        }
        if (cls) {
            if (Array.isArray(cls)) {
                cls = cls.join(' ');
            }
            attrs += ' class="' + cls + '"';
        }

        if (tag in shortTags) {
            return '<' + tag + attrs + '/>';
        } else {
            return '<' + tag + attrs + '>' + compile(tree.content) + '</' + tag + '>';
        }
    }

    function template(tree) {
        if (typeof tree === 'function') {
            return function (params) {
                return compile(tree(params));
            }
        }
        var st = compile(tree);
        return function () {
            return st;
        }
    }
}(this));

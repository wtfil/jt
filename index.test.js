/*global describe, it*/
var t = require('./'),
    assert = require('assert');

describe('interface', function () {

    describe('param', function () {
        it('String', function () {
            t('hi');
        });

        it('Function', function () {
            t(function () {});
        });

        it('Array', function () {
            t([]);
        });

        it('json', function () {
            t({});
        });
    });

    it('result', function () {
        var template = t([]);
        assert.equal(typeof template, 'function');
    });

});

describe('api', function () {
    it('String', function () {
        var template = t('hello');
        assert.equal(template(), 'hello');
    }); 

    it('Array', function () {
        var template = t(['hello', ' world']);
        assert.equal(template(), 'hello world');
    });

    describe('json', function () {
        it('content', function () {
            var template = t({
                content: 'hello world'
            });
            assert.equal(template(), '<div>hello world</div>');
        });
        it('tag', function () {
            var template = t({
                content: 'hello world',
                tag: 'span'
            });
            assert.equal(template(), '<span>hello world</span>');
        });
        describe('args', function () {
            it('single', function () {
                var template = t({
                    content: 'hello world',
                    data: 'foo'
                });
                assert.equal(template(), '<div data="foo">hello world</div>');
            });

            it('multiple', function () {
                var template = t({
                    content: 'hello world',
                    foo: 'bar',
                    data: 'baz'
                });
                assert.equal(template(), '<div foo="bar" data="baz">hello world</div>');
            });
        });
        describe('class', function () {
            it('string', function () {
                var template = t({
                    content: 'hello world',
                    cls: 'foo'
                });
                assert.equal(template(), '<div class="foo">hello world</div>');
            });

            it('array', function () {
                var template = t({
                    content: 'hello world',
                    cls: ['foo', 'bar']
                });
                assert.equal(template(), '<div class="foo bar">hello world</div>');
            });
        })
    });

    describe('short tags', function () {
        it('simple', function () {
            var template = t({
                tag: 'br'
            });
            assert.equal(template(), '<br/>');
        });
        it('with content', function () {
            var template = t({
                tag: 'br',
                content: 'hello world'
            });
            assert.equal(template(), '<br/>');
        });
        it('attrs', function () {
            var template = t({
                tag: 'br',
                foo: 'bar'
            });
            assert.equal(template(), '<br foo="bar"/>');
        });
    });

    describe('Function', function () {
        it('string', function () {
            var template = t(function () {
                return 'hello world';
            });
            assert.equal(template(), 'hello world');
        });
        it('json', function () {
            var template = t(function () {
                return {content: 'foo'}
            });
            assert.equal(template(), '<div>foo</div>');
        });
        it('with params', function () {
            var template = t(function (params) {
                return {content: 'hello ' + params.who}
            });
            assert.equal(template({who: 'world'}), '<div>hello world</div>');
        });
    })

    describe('examples', function () {
        it('1', function () {
            var st = t.compile({
                tag: 'span',
                content: [
                    {tag: 'li', content: 'hello'},
                    {tag: 'span', content: ['olo', {content: 'olo'}]}
                ]
            });
            assert.equal(st, '<span><li>hello</li><span>olo<div>olo</div></span></span>');
        });
    })
});


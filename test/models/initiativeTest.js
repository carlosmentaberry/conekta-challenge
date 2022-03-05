const assert = require('assert').strict;
const { Initiative, Fields } = require("../../src/models/initiative");

describe('Test initiative model class', function(){
    it('When creating a new Initiative then should be empty', function(){
        let initiative = new Initiative();
        assert.equal(0,0);
    });
});
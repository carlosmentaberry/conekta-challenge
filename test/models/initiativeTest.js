const assert = require('assert').strict;
const { Initiative, Field } = require("../../src/models/initiative");

describe('Test Initiative model class', function(){
    it('When creating a new Initiative then should be empty', function(done){
        // Arrange
        let initiative = new Initiative();

        // Assert
        assert.equal(typeof(initiative.fields), "undefined");
        assert.equal(typeof(initiative.initiative), "undefined");
        done();
    });
    it('When creating a new Initiative and initializating properties should not be empty', function(done){
        // Arrange
        let initiative = new Initiative();
        initiative.initiative = 'risk';
        initiative.fields = [];
        
        // Assert
        assert.notEqual(typeof(initiative.fields), "undefined");
        assert.notEqual(typeof(initiative.initiative), "undefined");
        assert.equal(typeof(initiative.fields), 'object');
        assert.equal(initiative.initiative, "risk");
        done();
    });
});

describe('Test Field model class', function(){
    it('When creating a new Field then should be empty', function(done){
        // Arrange
        let fields = new Field();
        
        // Assert
        assert.equal(typeof(fields.property), "undefined");
        assert.equal(typeof(fields.access_key), "undefined");
        done();
    });
    it('When creating a new Field and initializating properties should not be empty', function(done){
        // Arrange
        let fields = new Field();
        fields.property = 'general_info';
        fields.access_key = 'name,lastname,email';
        
        // Assert
        assert.notEqual(typeof(fields.property), "undefined");
        assert.notEqual(typeof(fields.access_key), "undefined");
        assert.equal(fields.property, 'general_info');
        assert.equal(fields.access_key, 'name,lastname,email');
        done();
    });
});

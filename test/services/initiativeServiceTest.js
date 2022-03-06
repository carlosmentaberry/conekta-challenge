const assert = require('assert').strict;
const { faker } = require('@faker-js/faker');
const sinon = require('sinon');
const chai = require("chai");
const expect = chai.expect;

const { Initiative, Field } = require("../../src/models/initiative");
const initiativeService = require("../../src/services/initiativeService");
const ContenedorMongoDb = require("../../src/contenedores/ContenedorMongoDB");
const InitiativeDaoMongoDb = require("../../src/daos/initiativeDaoMongoDB");
const { constructors, getInitiative, getInitiatives, createInitiative, updateInitiative, deleteInitiative } = require("../../src/services/initiativeService");

const Initiativethin = {
    initiative: 'risk',
    fields: [
        {
            general_info: {
            },
            comercial_info: {
            },
            fiscal_info: {
            }
        },
    ]
};

const InitiativeStubValue = {
    initiative: 'risk',
    fields: [
        {
            general_info: {
                name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                birthdate: faker.date.past(),
                birthdate: faker.internet.email(),
            },
            comercial_info: {
                company_name: faker.company.companyName(),
                term_and_conditions: faker.lorem.word(),
                send_products: faker.lorem.word(),
                web: faker.internet.url(),
            },
            fiscal_info: {
                rfc: faker.lorem.word(),
                activity: faker.company.bsNoun(),
                company_name: faker.company.companyName(),
                address: {
                    street: faker.address.streetName(),
                    number: faker.datatype.number(),
                    city: faker.address.city(),
                    zipcode: faker.address.zipCode(),
                }
            }
        },
    ]
};

const InitiativeStubValueFromMongo = {
    initiative: 'risk',
    fields: [
        {
            general_info: {
                name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                birthdate: faker.date.past(),
                birthdate: faker.internet.email(),
            },
            comercial_info: {
                company_name: faker.company.companyName(),
                term_and_conditions: faker.lorem.word(),
                send_products: faker.lorem.word(),
                web: faker.internet.url(),
            },
            fiscal_info: {
                rfc: faker.lorem.word(),
                activity: faker.company.bsNoun(),
                company_name: faker.company.companyName(),
                address: {
                    street: faker.address.streetName(),
                    number: faker.datatype.number(),
                    city: faker.address.city(),
                    zipcode: faker.address.zipCode(),
                }
            }
        },
    ]
};

const contenedorMongoDb = new ContenedorMongoDb('initiative', {
    initiative: { type: String, required: true },
    fields: [
        {
            property: { type: String, required: true },
            access_key: { type: String, required: false },
        }
    ]
})

describe('getInitiative - Test Initiative serivice class', function () {

    afterEach(function () {
        contenedorMongoDb.listObject.restore();
        initiativeService.getInitiative.restore();
    });

    it('getInitiative - When getting an initiative (getInitiative) by initiative name then success should returns one', async function () {

        // Arrange
        const stubrepo = sinon.stub(contenedorMongoDb, "listObject").returns(InitiativeStubValueFromMongo);
        const stubsvc = sinon.stub(initiativeService, "getInitiative").returns(InitiativeStubValue);

        // Act
        const initiativeFromMongo = await contenedorMongoDb.listObject("initiative", Initiativethin);
        const initiative = await initiativeService.getInitiative(Initiativethin);

        // Assert
        expect(stubsvc.calledOnce).to.be.true;
        expect(stubrepo.calledOnce).to.be.true;
        expect(InitiativeStubValueFromMongo.initiative).to.equal(initiativeFromMongo.initiative);
        expect(InitiativeStubValue.initiative).to.equal(initiative.initiative);
    });

    it('getInitiative - When getting an initiative (getInitiative) by initiative name then fails should returns empty initiative', async function () {

        // Arrange
        const stubrepo = sinon.stub(contenedorMongoDb, "listObject").returns(new Initiative());
        const stubsvc = sinon.stub(initiativeService, "getInitiative").returns(new Initiative());

        // Act
        const initiativeFromMongo = await contenedorMongoDb.listObject("initiative", Initiativethin);
        const initiative = await initiativeService.getInitiative(Initiativethin);

        // Assert
        expect(stubsvc.calledOnce).to.be.true;
        expect(stubrepo.calledOnce).to.be.true;
        assert.equal(typeof (initiativeFromMongo.initiative), "undefined");
        assert.equal(typeof (initiativeFromMongo.fields), "undefined");
        assert.equal(typeof (initiative.initiative), "undefined");
        assert.equal(typeof (initiative.fields), "undefined");
    });

});

describe('getInitiatives - Test Initiative serivice class', function () {

    afterEach(function () {
        contenedorMongoDb.listAll.restore();
        initiativeService.getInitiatives.restore();
    });

    it('getInitiatives - When getting an initiatives (getInitiatives) then success should returns all', async function () {

        // Arrange
        const stubrepo = sinon.stub(contenedorMongoDb, "listAll").returns([InitiativeStubValueFromMongo]);
        const stubsvc = sinon.stub(initiativeService, "getInitiatives").returns([InitiativeStubValue]);

        // Act
        const initiativeFromMongo = await contenedorMongoDb.listAll();
        const initiative = await initiativeService.getInitiatives();

        // Assert
        expect(stubsvc.calledOnce).to.be.true;
        expect(stubrepo.calledOnce).to.be.true;
        assert.equal(typeof (initiativeFromMongo), "object");
        assert.equal(typeof (initiative), "object");
    });

    it('getInitiatives - When getting an initiatives (getInitiatives) then fails should returns empty array', async function () {

        // Arrange
        const stubrepo = sinon.stub(contenedorMongoDb, "listAll").returns([]);
        const stubsvc = sinon.stub(initiativeService, "getInitiatives").returns([]);

        // Act
        const initiativeFromMongo = await contenedorMongoDb.listAll();
        const initiative = await initiativeService.getInitiatives();

        // Assert
        expect(stubsvc.calledOnce).to.be.true;
        expect(stubrepo.calledOnce).to.be.true;
        assert.equal(typeof (initiativeFromMongo), "object");
        assert.equal(typeof (initiative), "object");
    });

});

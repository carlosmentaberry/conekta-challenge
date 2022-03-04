const { buildSchema } = require("graphql");

module.exports = schema = buildSchema(`
    type General_info {
        name: String,
        last_name: String,
        birthdate: String,
        email: String
    }

    type Comercial_info {
        company_name: String,
        term_and_conditions: String,
        send_products: String,
        web: String
    }
    
    type Address {
        street: String,
        number: String,
        city: String,
        zip_code: String
    }

    type Fiscal_info {
        rfc: String,
        activity: String,
        company_name: String,
        address: Address
    }

    type User {
        general_info: General_info,
        comercial_info: Comercial_info,
        fiscal_info: Fiscal_info
    }

    type Field {
        property: String,
        access_key: String
    }

    type Initiative {
        initiative: String,
        fields: [Field]
    }

    type InitiativeOutPut {
        initiative: String,
        fields: [User]
    }
    
    type Query {
        getUsers : [User]
        getUser(name:String) : User

        getInitiatives: [InitiativeOutPut]
        getInitiative(initiative:String) : InitiativeOutPut
    }

    type Mutation {
        createUser(name:String, last_name:String) : User
        updateUser(name:String, last_name:String) : User
        deleteUser(name:String, last_name:String) : User

        createInitiative(initiative:InitiativeInput) : [Initiative]
        updateInitiative(initiative:InitiativeInput) : [Initiative]
        deleteInitiative(initiative:InitiativeInput) : [Initiative]

    }

    input FieldInput {
        property: String,
        access_key: String
    }

    input InitiativeInput {
        initiative: String,
        fields: [FieldInput]
    }
`);


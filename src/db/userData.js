const { User, General_info, Comercial_info, Fiscal_info, Address } = require("../models/user");

const userData = [
    {
        general_info: {
            name: "charly",
            last_name: "mentaberry",
            birthdate: "12/12/1988",
            email: "cmmentaberry@gmail.com"
        },
        comercial_info: {
            company_name: "Conekta",
            term_and_conditions: "TyC",
            send_products: "send_products",
            web: "www.test.com"
        },
        fiscal_info: {
            rfc: "cfs",
            activity: "nodejs",
            company_name: "Conekta",
            address: {
                street: "falsa",
                number: "123",
                city: "Springfield",
                zip_code: "1234"
            }
        }
    }
];


const getUserDB = async (data) => {
    return userData.filter(x => x.general_info.name == data.name)[0];
}

const getUsersDB = async () => {
    return userData;
}

module.exports = {
    getUserDB,
    getUsersDB,
}
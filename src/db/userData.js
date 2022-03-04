class User {
    constructor(general_info, comercial_info, fiscal_info) {
        this.general_info = general_info;
        this.comercial_info = comercial_info;
        this.fiscal_info = fiscal_info;
    }
    general_info;
    comercial_info;
    fiscal_info;
}

class General_info {
    constructor(name, last_name, birthdate, email) {
        this.name = name;
        this.last_name = last_name;
        this.birthdate = birthdate;
        this.email = email;
    }
    name;
    last_name;
    birthdate;
    email;
}

class Comercial_info {
    constructor(company_name, term_and_conditions, send_products, web) {
        this.company_name = company_name;
        this.term_and_conditions = term_and_conditions;
        this.send_products = send_products;
        this.web = web;
    }
    company_name;
    term_and_conditions;
    send_products;
    web;
}

class Fiscal_info {
    constructor(rfc, activity, company_name, address) {
        this.rfc = rfc;
        this.activity = activity;
        this.company_name = company_name;
        this.address = address;
    }
    rfc;
    activity;
    company_name;
    address;
}

class Address {
    constructor(street, number, city, zip_code) {
        this.street = street;
        this.number = number;
        this.city = city;
        this.zip_code = zip_code;
    }
    street;
    number;
    city;
    zip_code;
}




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

const saveUserDB = async (data) => {
    let user = new User();
    let general_info = new General_info();
    general_info.name = data.name;
    general_info.last_name = last_name;
    general_info.email = 'cmmentaberry@gmail.com';
    general_info.birthdate = '12/12/1988';

    let address = new Address();
    address.city = 'Springfield';
    address.number = '123';
    address.street = 'false';
    address.zip_code = '1234';

    let fiscal_info = new Fiscal_info();
    fiscal_info.activity = 'Dev';
    fiscal_info.address = address;
    fiscal_info.company_name = 'Conekta';
    fiscal_info.rfc = 'rfc';

    let comercial_info = new Comercial_info();
    comercial_info.company_name = 'Conekta';
    comercial_info.send_products = 'send_products';
    comercial_info.term_and_conditions = 'term_and_conditions';
    comercial_info.web = 'www.test.com';

    user.general_info = general_info;
    user.fiscal_info = fiscal_info;
    user.comercial_info = comercial_info;
    userData.push(user);
    return user;
}

const updateUserDB = async (data) => {
    userData.filter(x => x.name === data.name)[0].price = data.price;
    return userData;
}

const deleteUserDB = async (data) => {
    let index = userData.findIndex(x => x.name === data.name);
    console.log(index);
    if (index > -1) {
        userData.splice(index, 1);
    }

    return userData;
}

module.exports = {
    User,
    General_info,
    Comercial_info,
    Fiscal_info,
    Address,
    getUserDB,
    getUsersDB,
    saveUserDB,
    updateUserDB,
    deleteUserDB,
}
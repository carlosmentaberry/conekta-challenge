class User {
    constructor(general_info, comercial_info, fiscal_info) {
        this.general_info = general_info;
        this.comercial_info = comercial_info;
        this.fiscal_info = fiscal_info;
    }
}

class General_info {
    constructor(name, last_name, birthdate, email) {
        this.name = name;
        this.last_name = last_name;
        this.birthdate = birthdate;
        this.email = email;
    }
}

class Comercial_info {
    constructor(company_name, term_and_conditions, send_products, web) {
        this.company_name = company_name;
        this.term_and_conditions = term_and_conditions;
        this.send_products = send_products;
        this.web = web;
    }
}

class Fiscal_info {
    constructor(rfc, activity, company_name, address) {
        this.rfc = rfc;
        this.activity = activity;
        this.company_name = company_name;
        this.address = address;
    }
}

class Address {
    constructor(street, number, city, zip_code) {
        this.street = street;
        this.number = number;
        this.city = city;
        this.zip_code = zip_code;
    }
}

module.exports = {
    User,
    General_info,
    Comercial_info,
    Fiscal_info,
    Address,
}
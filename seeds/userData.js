const { User } = require('../models');

const userData = [
    {
        "name": "Honore",
        "email": "honoregn@gmail.com",
        "password": "toqwit502q48u5"
    },
    {
        "name": "Tom",
        "email": "thomas@gmail.com",
        "password": "kjerhu9234"
    },
    {
        "name": "Remy",
        "email": "remy@gmail.com",
        "password": "werhowh5042"
    },
    {
        "name": "Whitney",
        "email": "whitney@gmail.com",
        "password": "krjbtoqto5"
    },
    {
        "name": "Bretney",
        "email": "bret@gmail.com",
        "password": "wrnwero2i34o"
    },
    {
        "name": "Tara",
        "email": "tara@gmail.com",
        "password": "nruhtwu345b"
    },
    {
        "name": "Alex",
        "email": "alex@gmail.com",
        "password": "klwerno4h5asdf"
    },
]
const seedUserData = () => User.bulkCreate(userData);

module.exports = seedUserData
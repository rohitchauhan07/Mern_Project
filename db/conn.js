const mongoose = require('mongoose');

const DB = process.env.DATABASE;

// just to remove the DeprecationWarning
mongoose.set('strictQuery', false);

mongoose.connect(DB).then(() => {
    console.log(`connection successful`);
}).catch((err) => console.log(`no connection`));
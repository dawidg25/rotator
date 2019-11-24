const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));
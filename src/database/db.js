const mongoose = require('mongoose')

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err))

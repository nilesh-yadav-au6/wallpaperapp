const app = require('./app')
const PORT = process.env.PORT || 1234
app.listen(PORT, ()=> console.log(`Server connected successfully at port ${PORT}....!!!`))  
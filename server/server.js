import { connect } from 'mongoose';
import { config } from 'dotenv';

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION 💥 Shutting Down Server🌐... ');
    console.log(err.name, err.message);
    process.exit(1)
})

config({ path: './config.env' });
import app from './app.js';

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(con => console.log("DB connected Successfully..."))//console.log(con.connections)
    .catch(error => console.log(error));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on ${port}...`);
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION 💥 Shutting Down Server🌐... ');
    console.log(err.name, err.message);

    server.close(() => {
        process.exit(1)
    })
})
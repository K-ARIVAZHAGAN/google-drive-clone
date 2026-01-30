
try {
    console.log("Loading dotenv...");
    require('dotenv').config();

    console.log("Loading routes/auth...");
    require('./routes/auth');

    console.log("Loading routes/files...");
    require('./routes/files'); // This imports fileController -> upload middleware

    console.log("Loading config/db...");
    require('./config/db');

    console.log("All imports pass!");
} catch (err) {
    console.error("DEBUG ERROR:", err);
}

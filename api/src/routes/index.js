const { Router } = require('express');
const dogRoute = require('./dogRoute');
const temperamentRoute = require('./temperamentRoute');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/dogs', dogRoute);
router.use('/temperaments', temperamentRoute);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

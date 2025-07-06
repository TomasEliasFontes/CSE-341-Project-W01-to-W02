const router = requiere('express').Router();

router.get('/', (req, res) => {res.send("Hello World");});

module.exports = router;

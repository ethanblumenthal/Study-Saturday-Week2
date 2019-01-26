const router = require('express').Router();
const Test = require('../db/models/test');

router.get('/', async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.send(tests);
  } catch (err) { next(err) };
});

router.get('/:id', async (req, res, next) => {
  try {
    const test = await Test.findByPk(req.params.id);
    res.send(test);
  } catch (err) { next(err) };
});

router.post('/student/:id', async (req, res, next) => {
  try {
    const test = await Test.create(req.body);
    await test.setStudent(Number(req.params.id));
    res.status(201).send(test);
  } catch (err) { next(err) };
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Test.destroy({
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(204);
  } catch (err) { next(err) };
});

module.exports = router;

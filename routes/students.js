const router = require('express').Router();
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) { next(err) }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
      res.sendStatus(404);
    } else {
      res.status(200).json(student);
    }
  } catch (err) { next(err) }
});

router.post('/', async (req, res, next) => {
  try {
    const student = req.body;
    await Student.create(student);
    res.status(201).json(student);
  } catch (err) { next(err) }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = req.body;
    await Student.update(student, {
      where: {
        id: id
      }
    });
    res.status(200).json(student);
  } catch (err) { next(err) }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Student.destroy({
      where: {
        id: id
      }
    });
    res.sendStatus(204);
  } catch (err) { next(err) }
});

module.exports = router;

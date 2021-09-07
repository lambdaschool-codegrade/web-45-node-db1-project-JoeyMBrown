const router = require('express').Router()
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');
const Accounts = require('./accounts-model');

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then((account) => {
      res.status(201).json(account)
    })
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then((updatedAccount) => {
      res.status(200).json(updatedAccount)
    })
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then((success) => {
      res.status(200).json(req.account)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;

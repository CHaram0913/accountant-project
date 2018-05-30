const Record = require('./../models/records');

module.exports = app => {
    app.post('/api/record/add', async (req, res) => {
        try {
            let newRecord = new Record({
                account: 'awefawefawef',//req.body.account, //req.session.passport._id, //CHECK
                recordTime: req.body.recordTime,
                amount: req.body.amount,
                category: {
                    category: req.body.category.category,
                    notification: req.body.category.notification,
                    subCategory: req.body.category.subCategory
                },
                detail: {
                    payee: req.body.detail.payee,
                    memo: req.body.detail.memo
                }
            });
            
            let doc = await newRecord.save();

            res.send('Succesful');
        } catch(e) {
            res.status(400).send(e);
        }
    });
}
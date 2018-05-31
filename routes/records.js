const Record = require('./../models/records');

module.exports = app => {
    app.post('/api/record/add', async (req, res) => {
        try {
            let newRecord = new Record({
                account: req.session.passport.user,
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

    app.get('/api/record', async (req, res) => {
        try {
            let data = await Record.aggregate([
                {
                    $match : { 'account' : req.session.passport.user }
                },
                {
                    $sort : { recordTime : -1 }
                },
                {
                    $project : {
                        date : { $dateToString: { format: "%Y-%m-%d", date: "$recordTime" } },
                        category: '$category.category',
                        subCategory: '$category.subCategory',
                        amount: '$amount',
                        payee: '$detail.payee',
                        memo: '$detail.memo'
                    }
                }
            ]);
            
            res.json({ success: true, data });
        } catch (e) {
            
            res.json({ success: false, data: e.message });
        }
    })
}
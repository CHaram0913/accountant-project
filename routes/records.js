const Record = require('./../models/records');

const getMode = (categories) => {
    let max_frequency = 1;
    let counter = 0;
    let mode;

    for (let i = 0; i < categories.length; i++) {
        for (let j = i; j < categories.length; j++) {
            if (categories[i] === categories[j]) {
                counter++;
            }
            if (max_frequency < counter) {
                max_frequency = counter;
                mode = categories[i];
            }
        }
        counter = 0;
    }

    return mode;
}

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

    app.get('/api/record/suggestions', async (req, res) => {
        try {
            let categoryArray = [];
            let payeeArray = [];

            let categoryGroup = await Record.aggregate([
                {
                    $match : { account : req.session.passport.user }
                },
                {
                    $group : {
                        _id : '$category.subCategory',
                        count : { $sum : 1 }
                    }
                },
                {
                    $sort : { count : -1 }
                }
            ]);

            let payeeGroup = await Record.aggregate([
                {
                    $match : { account : req.session.passport.user }
                },
                {
                    $group : {
                        _id : '$detail.payee',
                        count : { $sum : 1 }
                    }
                },
                {
                    $sort : { count : -1 }
                }
            ]);

            for (let i = 0; i < categoryGroup.length; i++) {
                categoryArray.push({ label: categoryGroup[i]._id });
            }

            for (let i = 0; i < payeeGroup.length; i++) {
                payeeArray.push({ label: payeeGroup[i]._id });
            }

            res.json({
                success: true, 
                data: {
                    category: categoryArray,
                    payee: payeeArray
                }
            });
        } catch (e) {
            
            res.json({ success: false, data: e.message });
        }
    });

    app.get('/api/record', async (req, res) => {
        try {
            let data = await Record.aggregate([
                {
                    $match : { account : req.session.passport.user }
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
    });

    app.get('/api/record/categories', async (req, res) => {
        try {
            let data = await Record.aggregate([
                {
                    $match : { account : req.session.passport.user, type : 'expense' }
                },
                {
                    $sort : { recordTime : -1 }
                },
                {
                    $group : {
                        _id : '$category.subCategory',
                        category: { $push : '$category.category' },
                        count : { $sum : 1 },
                        average_amount : { $avg : '$amount' },
                        latest_payee : { $first : '$detail.payee'},
                        latest_transaction : { $first : '$recordTime' }
                    }
                },
                {
                    $sort : { count : -1, average_amount : -1, latest_transaction : -1 }
                },
                {
                    $project : {
                        interval: '$category',
                        latest_transaction : { $dateToString: { format: "%Y-%m-%d", date: "$latest_transaction" } },
                        average_spending : { $multiply : [{ $trunc: { $divide: [ "$average_amount", -1000 ] } }, 1000] },
                        latest_payee : '$latest_payee',
                        count : '$count'
                    }
                }
            ]);

            for (let i = 0; i < data.length; i++) {
                let interval_mode = getMode(data[i].interval);

                data[i].interval = interval_mode;
            }
            
            res.json({ success: true, data });
        } catch (e) {
            
            res.json({ success: false, data: e.message });
        }
    });

}
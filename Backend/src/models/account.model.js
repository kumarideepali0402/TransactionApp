const mongoose = require("mongoose");
const accountSchema = new  mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'user'
    },
    balance : {
        type: Number,
        required: true
    }
})

const accountModel = mongoose.model("account", accountSchema);
module.exports = accountModel;
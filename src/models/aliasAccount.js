import mongoose from '../db/db'

const aliasAccountSchema = mongoose.Schema({
    URL: {
        type: String,
        required: true
    },
    aliasId: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const aliasAccount = mongoose.model('aliasAccount', aliasAccountSchema);

export default aliasAccount;


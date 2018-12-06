import mongoose from '../db/db'

const aliasSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'alias field is Required']
    },
    siteUrl: {
        type: String,
        lowercase: true,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const alias = mongoose.model('alias', aliasSchema);

export default alias;


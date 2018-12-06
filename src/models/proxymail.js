import mongoose from '../db/db'

const proxyMailSchema = mongoose.Schema({
    aliasId: {
        type: String,
        required: true
    },
    proxyMail: {
        type: String,
        lowercase: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const proxyMail = mongoose.model('proxyMail', proxyMailSchema);

export default proxyMail;


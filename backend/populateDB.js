const async = require('async');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Initialize mongodb
const initMongo = require('./configs/db');
initMongo(mongoose, process.env.MONGO_URI);

const Organization = require('./model/organization');
const Status = require('./model/status');

async function createOrganizationAndStatus({organization, status, cb}){
    try{
        const orgData = new Organization(organization);
        const savedOrgData = await orgData.save();
        console.log(savedOrgData);
        const statusData = new Status({
            organization_id: savedOrgData._id,
            status
        })
        const savedStatus = await statusData.save();
        cb(null);
    }
    catch(error){
        cb(error);
    }
}

const OrganizationAnsStatusData = [
    {
        'organization': {email: 'organization@org.in', password: 'organization', organization_name: "Organization", organization_id: 'org123', wallet_address: '0xfawmj343dkjivneijwoi3249aiwemcmworxkdom', isVerified: true},
        'status': 'pending'
    },
    {
        'organization': {email: 'institution@org.in', password: 'institution', organization_name: "Institution", organization_id: 'institution123', wallet_address: '0x32kl99ouxbvdhwiz324kdjnkqoox2d9cd7e3f9wkdom', isVerified: true},
        'status': 'verified'
    },
    {
        'organization': {email: 'theglobe@gl.ac.in', password: 'theglobe', organization_name: "The Globe", organization_id: 'theglobe123', wallet_address: '0x332jklmn42vow6ei2m4ivn81s7die83244m', isVerified: true},
        'status': 'rejected'
    },
    {
        'organization': {email: 'schr@ac.hr.in', password: 'schr', organization_name: "Sre Carmel HR", organization_id: 'scht123', wallet_address: '0xfeicmao3983kmd3u120cjds983j948c', isVerified: true},
        'status': 'pending'
    },
    {
        'organization': {email: 'tkhclg@cl.org.in', password: 'tkhclg', organization_name: "The King High", organization_id: 'tkhc123', wallet_address: '0x12jmvki9e8camkjfkii3kkcajinbjaimckoa0eu4', isVerified: true},
        'status': 'verified'
    },
    {
        'organization': {email: 'kpr@kp.ac.in', password: 'kitepro', organization_name: "Kite Pro React", organization_id: 'kpr123', wallet_address: '0x32kl99ouxbvdhwiz324kdjnkqoox2d9cd7e3f9wkdom', isVerified: true},
        'status': 'verified'
    },

]

function addOrganizationAndStatusData(){
    async.parallel(OrganizationAnsStatusData.map(data => function(cb){
        createOrganizationAndStatus({...data, cb});
    }),
    function(err) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('done');
        }
        // All done, disconnect from database
        mongoose.connection.close();
    });
}

addOrganizationAndStatusData();



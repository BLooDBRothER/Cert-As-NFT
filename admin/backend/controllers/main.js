const Status = require("../model/status");
const sendStatusMail = require("../utils/mail");

exports.getStatusData = async (req, res) => {
  try {
    const data = await Status.aggregate([
      {
        $lookup: {
          from: "organizations",
          localField: "organization_id",
          foreignField: "_id",
          as: "organization",
        },
      },
    ]);
    console.log(data);
    const resData = [];
    for(let i=0; i<data.length; i++){
        const statusData = data[i];
        console.log(statusData)
        const orgData = data[i].organization[0];
        console.log('org data', orgData)
        const tempData = {
            id: statusData._id,
            organization_id: orgData.organization_id,
            organization_name: orgData.organization_name,
            email: orgData.email,
            wallet_address: orgData.wallet_address,
            status: statusData.status,
            created_at: statusData.created
        }
        resData.push(tempData);
    }
    console.log(resData)
    
    return res.status(200).json(resData);
  } catch (error) {
    return res.status(500).json({"message": "server error"});
  }
};

exports.updateStatus = async (req, res) => {
    try{
        console.log(req.body)
        const upD = await Status.updateOne({_id: req.body.id}, {status: req.body.status});
        console.log(upD)
        sendStatusMail(req.body.email, req.body.status, res);
        return res.status(200).json({"message": "Successfully updated"});
    }
    catch(error){
        return res.status(500).json({"message": "server error"});
    }
}

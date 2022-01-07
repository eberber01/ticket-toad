import TeamModel from "../model/TeamModel.js"

export const getAccessCode = (req, res)=>{
    console.log("pog")
    TeamModel.findOne({admin: req.body.email}, (err, Team)=>{
        console.log(Team)
        res.json(Team.accessCode)
    })
}

const logOutController = (req,res)=>{
    res.clearCookie("token");
    res.redirect("/"); 
}

module.exports = {logOutController};
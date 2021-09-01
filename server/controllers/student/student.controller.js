exports.homeController = async (req,res,next) =>{
    res.status(200).json({
        sucess:true,
        data:"Home route"
    });
};

exports.teachersController = async (req,res,next) =>{
    res.status(200).json({
        sucess:true,
        data:"teacher route"
    });
};
exports.universityController = async (req,res,next) =>{
    res.status(200).json({
        sucess:true,
        data:"universityController route"
    });
};
exports.profileController = async (req,res,next) =>{
    res.status(200).json({
        sucess:true,
        data:"profileController route"
    });
};

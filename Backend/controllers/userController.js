export const getUserData = async (requestAnimationFrame, res) =>{
    try {

        const role = req.user.role;
        const recentSearchCities = req.user.recentSearchCities;
        res.json({success: true, role, recentSearchCities})
        
    } catch (error) {
        res.json({success: false, message: message.error})
    }
}

export const storeRecentSearchCities = async (req, res) =>{
    try {
        const {recentSearchCities} = req.body;
        const user = await req.user;

        if(user.recentSearchCities.length < 3){
            recentSearchCities.push(recentSearchCities)
        }else{
            user.recentSearchCities.shift();
            recentSearchCities.push(recentSearchCities);
        }
        await user.save();
        res.json({success : true, message: "City Added"})
    } catch (error) {
        res.json({success : false, message : message.error})
    }
}
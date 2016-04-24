function CommentsWrapper(){

}

module.exports = function(user , sequelize){
	return new CommentsWrapper(user, sequelize);
};


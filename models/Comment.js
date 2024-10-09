const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model{}
Comment.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        comment_text:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        blog_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'blog',
              key: 'id',
            },     
    },
    user_id:{
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },  
    }
},{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
    timestamps:true,    //this code returns two values updated at and created at

}

)
module.exports=Comment
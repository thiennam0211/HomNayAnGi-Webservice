const mongoose = require('mongoose');
const Enums = require('./enums');
const { Kinds } = require('../../common');

const Schema = mongoose.Schema;

const { String, Number, Date, ObjectId, Mixed } = Schema.Types;

const schema = {};
module.exports = schema;

schema.User = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            validate: (value) => Kinds.isEmail(value)
        },
        password: {
            type: String,
            minLength: 1,
            required: true
        },
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        displayName: {
            type: String,
            trim: true
        },
        gender: {
            type: String,
            default: Enums.Genders.UNKNOWN,
            enum: Kinds.objectValues(Enums.Genders)
        },
        avatar: String, // name of file save in database
        birthday: Date, // 'YYYY-MM-DDTHH:mm:ss.sssZ', (ex: 1994-11-05T13:15:30Z)'
        role: {
            type: String,
            default: Enums.UserRoles.USER,
            enum: Kinds.objectValues(Enums.UserRoles)
        },
        status: {
            type: String,
            default: Enums.UserStatuses.ACTIVE,
            enum: Kinds.objectValues(Enums.UserStatuses)
        }
    },
    {
        collection: 'User',
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } // very important in searching
    }
);
schema.User.index({ email: 'text', displayName: 'text', firstName: 'text', lastName: 'text' });

schema.UserDevice = new Schema(
    {
        user: {
            type: ObjectId, //
            required: true,
            ref: 'User'
        },
        deviceId: {
            type: String,
            required: true
        },
        token: String
    },
    {
        collection: 'UserDevice',
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);
schema.UserDevice.index({ user: 1 });
schema.UserDevice.index({ deviceId: 1 });

schema.SecretCode = new Schema(
    {
        userId: {
            type: ObjectId,
            required: true
        },
        uniqueId: {
            type: String,
            required: true,
            unique: true
        },
        secretKey: {
            type: String,
            required: true
        }
    },
    {
        collection: 'SecretCode'
    }
);

schema.Recipe = new Schema(
    {
        title: {
            type: String,
            require: true,
            validate: (value) => Kinds.mustBeString(value)
        },
        description: {
            type: String
        },
        serves: {
            type: Number,
            require: true,
            default: 2,
            validate: (value) => Kinds.mustBeNumber(value)
        },
        cookIn: {
            type: Number,
            require: true,
            default: 60,
            validate: (value) => Kinds.mustBeNumber(value)
        },
        type: {
            type: String,
            require: true,
            enum: Kinds.objectValues(Enums.DishTypes)
        }
    },
    {
        collection: 'Recipe',
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);
schema.Recipe.index({ title: 'text' });

schema.RecipeIngredient = new Schema(
    {
        recipe: {
            type: ObjectId,
            required: true,
            ref: 'Recipe'
        },
        ingredient: {
            type: ObjectId,
            required: true,
            ref: 'Food'
        },
        amount: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true,
            enum: Kinds.objectValues(Enums.Unit)
        }
    },
    {
        collection: 'RecipeIngredient'
    }
);

schema.DishType = new Schema(
    {
        name: {
            type: String,
            require: true,
            validate: (value) => Kinds.mustBeString(value)
        }
    },
    {
        collection: 'DishType'
    }
);

schema.Food = new Schema(
    {
        name: {
            type: String,
            require: true,
            validate: (value) => Kinds.mustBeString(value)
        },
        nutrition: {
            calories: {
                type: Number
            },
            protein: {
                type: Number
            },
            carbs: {
                type: Number
            },
            fat: {
                type: Number
            }
        }
    },
    {
        collection: 'Food',
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

schema.FoodType = new Schema(
    {
        name: {
            type: String,
            require: true,
            validate: (value) => Kinds.mustBeString(value)
        }
    },
    {
        collection: 'FoodType',
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

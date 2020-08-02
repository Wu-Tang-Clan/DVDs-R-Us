const Sequelize = require('sequelize');

const {
  UUID, UUIDV4, STRING,
} = Sequelize;
const { db } = require('../db');

const User = db.define('User', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // phoneNumber: {
  //   type: STRING,
  //   // allowNull: false,
  //   unique: true,
  //   // valdation needs to be worked out
  //   // validate: {
  //   //     isValidPhoneNo: function (value) {
  //   //         if (!value) return value;

  //   //         var regexp = /^[0-9]+$/;
  //   //         var values = (Array.isArray(value)) ? value : [value];

  //   //         values.forEach(function (val) {
  //   //             if (!regexp.test(val)) {
  //   //                 throw new Error("Number only is allowed.");
  //   //             }
  //   //         });
  //   //         return value;
  //   //     },
  //   // }
  // },
  // firstName: {
  //   type: STRING,
  //   allowNull: false,
  // },
  // lastName: {
  //   type: STRING,
  //   allowNull: false,
  // },
  // email: {
  //   type: STRING,
  //   allowNull: false,
  //   validate: {
  //     isEmail: true,
  //   },
  // },
  // cart: {
  //   type: Sequelize.ARRAY,
  // },
  // previousOrders: {
  //   type: Sequelize.ARRAY,
  // },
  // shippingAddressStreet: {
  //   type: STRING,
  //   allowNull: true,
  // },
  // shippingAddressUnit: {
  //   type: STRING,
  //   allowNull: true,
  // },
  // shippingAddressZIP: {
  //   type: INTEGER,
  //   allowNull: true,
  // },
  // shippingAddressCity: {
  //   type: STRING,
  //   allowNull: true,
  // },
});

module.exports = { User };

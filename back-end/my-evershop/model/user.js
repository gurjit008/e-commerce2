const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already existed"],
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'],
  },
  password: { type: String,
  required: [true, "Password is required"],
// match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long' ]
 },
 token:String,
 enable:{type:Boolean, default:true}
});

const User = new model("user", userSchema);

module.exports = User;

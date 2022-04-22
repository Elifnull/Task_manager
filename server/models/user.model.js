const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "First name is required!"],
        minLength: [2, "A minimum of 2 characters is required!"]
    },

    lastName: {
        type: String,
        required: [true, "Last name is required!"],
        minLength: [2, "A minimum of 2 characters is required!"]
    },

    email: {
        type: String,
        required: [true, "An email address is required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please add a valid email address. i.e example@example.com']
    },

    password: {
        type: String,
        required: [true, "A password is required!"],
        minLength: [8, "Your password MUST be at least 8 characters!"]
    },

    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
    }

},{timestamps: true})


    UserSchema.virtual("confirmPassword")
        .get(()=>this._confirmPassword)
        .set((value)=>this._confirmPassword = value)


UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match!")
        console.log("Passwords don't match!")
    }
    next()
})

UserSchema.pre("save", function(next){
    console.log("in pre save");
        bcrypt.hash(this.password, 10)
            .then((hashedPassword)=>{
                this.password = hashedPassword;
                next();
            })
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
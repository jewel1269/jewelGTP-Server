import mongoose from "mongoose";

const { Schema } = mongoose;

const chatSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;

import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        messages: [],
        currentChatId: null,
        loading: false,
        error: null,
    },
    reducers: {
        createNewChat(state, action) {
            const { chatId, title } = action.payload;
            state.chats[chatId] = {
                id: chatId,
                title,
                messages: [],
                LastUpdated: new Date().toISOString(),
            }
        },
        addNewMessage: (state, action) => {
            const { chatId, content, role } = action.payload;
            state.chats[chatId].messages.push({ 
                id: Date.now() + Math.random(),
                content, 
                role 
            });
        },
        addMessages: (state, action) => {
            const { chatId, messages } = action.payload
            const formattedMessages = messages.map((msg, idx) => ({
                id: msg._id || Date.now() + idx,
                content: msg.content,
                role: msg.role
            }))
            state.chats[chatId].messages.push(...formattedMessages)
        },
        setChats(state, action) {
            state.chats = action.payload;
        },
        setCurrentChatId(state, action) {
            state.currentChatId = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        deleteChat(state, action) {
            const { chatId } = action.payload;
            delete state.chats[chatId];
            if (state.currentChatId === chatId) {
                state.currentChatId = null;
            }
        },
    },
});

export const { setChats, setCurrentChatId, setLoading, setError, addNewMessage, createNewChat, addMessages, deleteChat } = chatSlice.actions;
export default chatSlice.reducer;
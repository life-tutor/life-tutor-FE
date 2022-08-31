import instance from "./axios";

export const postingsAPI = { 
    fetchPostingsListWithScroll: async (pageParams) => {
        const res = await instance.get(`/api/main/postings?page=${pageParams}&size=10`);
        const token = localStorage.getItem("Authorization");
        let apiurl = token? `/api/main/user/postings?page=${pageParams}&size=10`:`/api/main/postings?page=${pageParams}&size=10`
        const res = await instance.get(apiurl);
        const { content } = res.data;
        const { last } = res.data;
        return { posts:content, nextPage:pageParams + 1, isLast:last};
    },
    postPosting: async (newData) => {
        const res = await instance.post('/api/board', newData);
        return res.data;
    },

    postEditing: async ({ postingId, newData}) => {
        console.log(postingId, newData);
        await instance.put(`/api/board/${postingId}`, newData)
    },
    postDelete: async (postingId) => {
        await instance.delete(`/api/board/${postingId}`);

    },
    fetchSearchPostingsListWithScroll: async (pageParams, hashtag) => {
        const res = await instance.get(`/api/search/postings?hashtag=${hashtag}&page=${pageParams}&size=10`);
        const { content } = res.data;
        const { last } = res.data;
        return { posts:content, nextPage:pageParams + 1, isLast:last};

    }
}

export const chatroomAPI = {
    createChatRoom: async (param) => {
        const { title, hashtag } = param;
        const newData = {title, hashtag};
        const res = await instance.post('api/chat/room', newData);
        return res.data;
    },
    fetchRoomsListWithScroll: async (pageParams) => {
        const res = await instance.get(`/api/main/rooms?page=${pageParams}&size=10`);
        const { content } = res.data;
        const { isLast } = res.data;

        return { rooms:content, nextPage: pageParams + 1, isLast};
    },
    fetchSearchRoomsListWithScroll: async (pageParams, hashtag) => {
        console.log(hashtag);
        const res = await instance.get(`/api/search/rooms?hash_tag=${hashtag}&page=${pageParams}&size=10`);
        const { content } = res.data;
        const { isLast } = res.data;

        return {rooms:content, nextPage: pageParams + 1, isLast};

    }
}

import {
    ADD_COMMENT,
    SET_POSTS,
    CREATING_POST,
    POST_CREATED
} from './actionTypes'
import axios from 'axios'

export const addPost = (post) => {

    return dispatch => {

        dispatch(creatingPost())

        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambelambe-406e2.cloudfunctions.net',
            method: 'POST',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => console.log(err))
            .then(resp => {
                post.image = resp.data.imageUrl
                axios.post('/posts.json', { ...post })
                    .catch(err => console.logI(err))
                    .then(res => {
                        console.log(res.data)
                        dispatch(getPosts())
                        dispatch(postCreated())
                    })
            })
    }

}


export const addComment = (payload) => {
    return dispatch => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => console.log(err))
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)
                axios.patch(`/posts/${payload.postId}.json`, { comments })
                    .catch(err => console.log(err))
                    .then(res => {
                        dispatch(getPosts())
                    })
            })
    }
}


export const setPosts = (posts) => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}


export const getPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => console.log(err))
            .then(res => {
                const rawPosts = res.data
                const posts = []
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key
                    })
                }

                dispatch(setPosts(posts.reverse()))

            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}
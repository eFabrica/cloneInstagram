import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Author from './Author'
import Comments from './Comments'
import AddComment from './AddComments'
import { addComment } from '../store/actions/posts'

class Post extends Component {


    render() {

        const adicionarComentario = this.props.name ? <AddComment postId={this.props.id} /> : null

        return (
            <View style={styles.container}>
                <Image source={{ uri: this.props.image }} style={styles.image} />
                <Author email={this.props.email} nickname={this.props.nickname} />
                <Comments comments={this.props.comments} />
                {adicionarComentario}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: 'contain'
    }
})

const mapStateToProps = ({ user }) => {
    return {
        name: user.name
    }
}

export default connect(mapStateToProps, null)(Post)
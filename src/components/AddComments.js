import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { addComment } from '../store/actions/posts'
class AddComments extends Component {

    state = {
        comment: '',
        editMode: false
    }

    handleAddComment = () => {

        this.props.onAddComment({
            postId: this.props.postId,
            comment: {
                nickname: this.props.name,
                comment: this.state.comment
            }
        })

        this.setState({
            comment: '',
            editMode: false
        })

    }

    render() {
        let commentArea = null
        if (this.state.editMode) {
            commentArea = (
                <View style={styles.container}>
                    <TextInput placeholder='Pode comentar'
                        style={styles.input} autoFocus={true}
                        value={this.state.comment}
                        onChangeText={value => this.setState({ comment: value })}
                        onSubmitEditing={this.handleAddComment}
                    />
                    <TouchableWithoutFeedback onPress={() => this.setState({ editMode: false })}>
                        <Icon name='times' size={15} color='#555' />
                    </TouchableWithoutFeedback>
                </View>
            )
        } else {
            commentArea = (
                <TouchableWithoutFeedback onPress={() => this.setState({ editMode: true })}>
                    <View style={styles.container}>
                        <Icon name='comment-o' size={25} color='#5555' />
                        <Text style={styles.caption}>Adicione um comentário...</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {commentArea}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    caption: {
        marginLeft: 10,
        fontSize: 12,
        color: '#CCC'
    },
    input: {
        width: '90%'
    }
})


const mapStateToProps = ({ user }) => {
    return {
        name: user.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddComment: payload => dispatch(addComment(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComments)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../store/actions/posts'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    Alert,
    Keyboard
} from 'react-native'
import ImagePicker from 'react-native-image-picker'

const noUser = 'Você precisa estar logado para adicionar imagens'
class AddPhoto extends Component {

    state = {
        image: null,
        comment: '',
    }

    UNSAFE_componentWillMount = () => {
        Keyboard.dismiss()
    }

    UNSAFE_componentWillReceiveProps = (prevProps) => {
        console.log('entrou aqui 1')
        if (!prevProps.loading && prevProps.posted) {
            console.log('entrou aqui 2')
            this.setState({
                image: null,
                comment: ''
            })

            this.props.navigation.push('TabNavigator', { screen: 'Feed' })
        }
    }

    pickImage = () => {

        if (!this.props.name) {
            Alert.alert('Falha!', noUser)
            return
        }

        ImagePicker.showImagePicker({
            title: 'Escolha a Imagem',
            maxHeight: 600,
            maxWidth: 800
        }, res => {
            if (!res.didCancel) {
                this.setState({ image: { uri: res.uri, base64: res.data } })
            }
        })
    }

    save = async () => {

        if (!this.props.name) {
            Alert.alert('Falha!', noUser)
            return
        }

        this.props.onAddPost({
            id: Math.random(),
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments: [{
                nickname: this.props.name,
                comment: this.state.comment
            }]
        })

    }

    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Compartilhe uma imagem</Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image} />
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <TouchableOpacity onPress={this.pickImage} style={styles.button}>
                        <Text style={styles.buttonText}>Escolha a foto</Text>
                    </TouchableOpacity>
                    <TextInput placeholder={'Algum comentário para a foto?'}
                        style={styles.input} value={this.state.comment}
                        onChangeText={value => this.setState({ comment: value })}
                        editable={this.props.name != null}
                    />
                    <TouchableOpacity onPress={this.save}
                        disabled={this.props.loading}
                        style={[styles.button, this.props.loading ? styles.buttonDisabled : null]}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>

                    <View style={{ height: 10, width: '100%' }} />

                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width * 3 / 4,
        backgroundColor: '#EEE',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#333',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: 'center'
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
        width: '50%',
        borderRadius: 15
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center'
    },
    input: {
        marginTop: 20,
        width: '90%',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 15,
        backgroundColor: '#EEE',
    },
    buttonDisabled: {
        backgroundColor: '#AAA'
    }
})


const mapStateToProps = ({ user, posts }) => {
    return {
        email: user.email,
        name: user.name,
        loading: posts.isUploading,
        posted: posts.isPosted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)
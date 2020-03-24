import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import { createUser, logout } from '../store/actions/user'


class Register extends Component {

    state = {
        name: '',
        email: '',
        password: ''
    }

    UNSAFE_componentWillReceiveProps = (prevProps) => {
        console.log('entrou aqui 1')
        console.log(prevProps)
        if (!prevProps.loading && prevProps.created) {
            console.log('entrou aqui 2')
            this.setState({
                name: '',
                email: '',
                password: ''
            })

            this.props.navigation.push('TabNavigator', { screen: 'Profile' })
        }

        if(prevProps.failed){
            Alert.alert('Falhou', prevProps.msg)
            this.props.onLogout()
            this.setState({
                name: '',
                email: '',
                password: ''
            })
            return
        }
    }

    registerUser = () => {

        if (this.state.password.length < 6) {
            Alert.alert('Atenção', 'A senha deve ter no mínimo 6 caracteres.')
            return
        } else {

            this.props.onCreateUser(this.state)
        }

    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'Nome'} style={styles.input}
                    autoFocus={true} value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                />
                <TextInput placeholder={'Email'} style={styles.input}
                    keyboardType={'email-address'} value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput placeholder={'Senha'} style={styles.input}
                    secureTextEntry={true} value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <TouchableOpacity
                    onPress={() => { this.registerUser() }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingLeft: 15
    }
})

const mapStateToProps = ({ user }) => {
    return {
        loading: user.isUploading,
        created: user.isCreated,
        failed: user.isFailed,
        msg: user.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateUser: user => dispatch(createUser(user)),
        onLogout: user => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)



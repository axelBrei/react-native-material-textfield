import React, { Component } from 'react';
import { AppRegistry, ScrollView, View } from 'react-native';
import { RaisedTextButton } from 'react-native-material-buttons';
import  TextField  from './src/components/field/index';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

let styles = {
  scroll: {
    backgroundColor: '#E8EAF6',
  },

  container: {
    paddingTop: 100,
    paddingHorizontal: 25,
    flex: 1
  },

  containertS: {
    flex: 1,
    height: 200
  },

  contentContainer: {
    padding: 8,
  },
};

export default function init() {
  class Example extends Component {
    constructor(props) {
      super(props);

      this.onFocus = this.onFocus.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeText = this.onChangeText.bind(this);
      this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
      this.onSubmitLastName = this.onSubmitLastName.bind(this);
      this.onSubmitAbout = this.onSubmitAbout.bind(this);
      this.onSubmitEmail = this.onSubmitEmail.bind(this);
      this.onSubmitPassword = this.onSubmitPassword.bind(this);
      this.onAccessoryPress = this.onAccessoryPress.bind(this);

      this.firstnameRef = this.updateRef.bind(this, 'firstname');
      this.lastnameRef = this.updateRef.bind(this, 'lastname');
      this.aboutRef = this.updateRef.bind(this, 'about');
      this.emailRef = this.updateRef.bind(this, 'email');
      this.passwordRef = this.updateRef.bind(this, 'password');

      this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

      this.state = {
        firstname: 'Eddard',
        lastname: 'Stark',
        about: 'Stoic, dutiful, and honorable man, considered to embody the values of the North',
        secureTextEntry: true,
      };
    }

    onFocus() {
      let { errors = {} } = this.state;

      for (let name in errors) {
        let ref = this[name];

        if (ref && ref.isFocused()) {
          delete errors[name];
        }
      }

      this.setState({ errors });
    }

    onChangeText(text) {
      ['firstname', 'lastname', 'about', 'email', 'password']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
          if (ref.isFocused()) {
            this.setState({ [name]: text });
          }
        });
    }

    onAccessoryPress() {
      this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }

    onSubmitFirstName() {
      this.lastname.focus();
    }

    onSubmitLastName() {
      this.about.focus();
    }

    onSubmitAbout() {
      this.email.focus();
    }

    onSubmitEmail() {
      this.password.focus();
    }

    onSubmitPassword() {
      this.password.blur();
    }

    onSubmit() {
      let errors = {};

      ['firstname', 'lastname', 'email', 'password']
        .forEach((name) => {
          let value = this[name].value();

          if (!value) {
            errors[name] = 'Should not be empty';
          } else {
            if ('password' === name && value.length < 6) {
              errors[name] = 'Too short';
            }
          }
        });

      this.setState({ errors });
    }

    updateRef(name, ref) {
      this[name] = ref;
    }

    renderPasswordAccessory() {
      let { secureTextEntry } = this.state;

      let name = secureTextEntry?
        'visibility':
        'visibility-off';

      return (
        <MaterialIcon
          size={24}
          name={name}
          color={TextField.defaultProps.baseColor}
          onPress={this.onAccessoryPress}
          suppressHighlighting
        />
      );
    }

    render() {
      let { errors = {}, secureTextEntry, ...data } = this.state;
      return (
          <View style={styles.container}>

            <TextField
                ref={this.aboutRef}
                value={''}
                containerStyle={styles.containertS}
                labelTextStyle={{flex: 1}}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitAbout}
                returnKeyType='next'
                label='@ export default class TextField extends PureComponent@ export default class TextField extends PureComponentextends PureComponent@ export default class TextField extends PureComponent'
                labelProps={{
                  numberOfLines: 3
                }}
            />

            <TextField
                ref={this.aboutRef}
                value={''}
                containerStyle={styles.containertS}
                labelTextStyle={{flex: 1}}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitAbout}
                returnKeyType='next'
                label='@ export default class TextField ex'
                labelProps={{
                  numberOfLines: 3
                }}
            />
          </View>
      );
    }
  }

  AppRegistry.registerComponent('example', () => Example);
}

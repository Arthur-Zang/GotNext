import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import styles from './signin.styles'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { COLORS, SIZES } from '../../constants/theme'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { HeightSpacer, ReusableButton, WidthSpacer } from '../../components'
import { useAuth } from '../../components/AuthContext/AuthContext'
import { useLocationAuth } from '../../components/AuthContext/LocationAuthContext'

const validationSchema = Yup.object().shape({
    password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required('Required'),
    email: Yup.string()
    .email("Provide a valid email")
    .required('Required')
})

const SignIn = () => {
    const {signIn} = useAuth();
    const { selectedCourt, setSelectedCourtAsync } = useLocationAuth();
    const [loader, setLoader] = useState(false);
    const [response, setResponse] = useState(null);
    const [obscureText, setObscureText] = useState(false);

    const handleSignIn = async (values) => {
        setLoader(true);
        try {
            const response = await fetch('http://192.168.1.19:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });

            if (response.ok) {
                // Authentication successful
                const responseData = await response.json();
                signIn(responseData);
                //Also set location to null
                setSelectedCourtAsync(null);
                console.log(responseData);
            } else {
                // Authentication failed
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        } finally {
            setLoader(false);
        }
    };
  return (
    <View style={styles.container}>
      <Formik
      initialValues={{email: "", password: ""}}
      validationSchema={validationSchema}
      onSubmit={(value)=>{}}>
        {({
            handleChange,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched
        }) => (
            <View>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>Email</Text>
                    <View>
                        <View style={styles.inputWrapper(touched.email ? COLORS.lightBlue : COLORS.lightGrey)}>
                            <MaterialCommunityIcons
                            name="email-outline"
                            size={20}
                            color={COLORS.gray}
                            />
                            <WidthSpacer width={10}/>
                            <TextInput
                            placeholder='Enter your email'
                            onFocus={()=>{setFieldTouched('email')}}
                            onBlur={()=>{setFieldTouched('email', "")}}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{flex: 1}}
                            />
                        </View>
                        {touched.email && errors.email && (
                            <Text style={styles.errorMessage}>{errors.email}</Text>
                        )}
                    </View>
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>Password</Text>
                    <View>
                        <View style={styles.inputWrapper(touched.password ? COLORS.lightBlue : COLORS.lightGrey)}>
                            <MaterialCommunityIcons 
                            name="lock-outline"
                            size={20}
                            color={COLORS.gray}
                            />
                            <WidthSpacer width={10}/>
                            <TextInput 
                            secureTextEntry={obscureText}
                            placeholder='Enter your password'
                            onFocus={()=>{setFieldTouched('password')}}
                            onBlur={()=>{setFieldTouched('password', "")}}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{flex: 1}}
                            />
                            <TouchableOpacity onPress={()=>{
                                setObscureText(!obscureText)
                            }}>
                                <MaterialCommunityIcons
                                    name={obscureText ? "eye-outline" : "eye-off-outline"}
                                    size={18}

                                />
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password && (
                            <Text style={styles.errorMessage}>{errors.password}</Text>
                        )}
                    </View>
                </View>
                <HeightSpacer height={20} />
                <ReusableButton
                    onPress= {() => handleSignIn(values)}
                    btnText = {"SIGN IN"}
                    textColor = {COLORS.white}
                    width = {SIZES.width-40}
                    backgroundColor = {COLORS.green}
                    borderWidth = {0}
                    borderColor = {COLORS.green}
                />
            </View>
        )}
      </Formik>
    </View>
  )
}

export default SignIn
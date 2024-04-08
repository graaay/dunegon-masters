import { Container, LoginConainter, FormContainer, OauthContainer, WrapperItens, LogoContainer } from "./styles";
import { InputFloatingLabel, Button, Divider, SliderCheckbox } from '../../components/index';
import { FcGoogle } from "react-icons/fc";
import { IoLogoDiscord } from "react-icons/io5";
import { FaApple } from "react-icons/fa6";
import { LoginForm } from "../../services/types";
import Logo1 from '../../assets/logol1.jpg';
import { useForm } from "react-hook-form";
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { registerUser, socialLogin } from '../../services/api';

import { create } from 'apisauce';
import { useEffect, useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

function Authentication() {

    const navigate = useNavigate();


    const { control, getValues, setValue, register, handleSubmit } = useForm<LoginForm>();
    const [accessToken, setAccessToken] = useState('');
    const { login, user } = useAuth();
    
    const onSubmit = (data: LoginForm) => {
        console.log(data);
    }

    const goForHome = () => {
        console.log('indo para home, amém')
        navigate(`/Home`);
    }

    useEffect(() => {
        if (accessToken) {
            fetchUserInfo();
        }
    }, [accessToken]);

    const fetchUserInfo = async () => {
        const googleUserInfo = await getGoogleUserInfo();
        
        if (googleUserInfo) {
            const {id, email, name} = googleUserInfo;
            const userLoginResponse: any = await handleSocialLogin(id, email);
            
            if (userLoginResponse?.message === 'Prosseguir para cadastramento.') {
                const newUser = await handleRegisterUser(email, name, id);
                login(newUser);
            } else {
                login(userLoginResponse);
            }
            goForHome();
        } else {
            console.error('Erro ao buscar informações do usuário:', googleUserInfo);
        }
    };

    const getGoogleUserInfo = async (): Promise<any> => {
        const googleApi = create({
            baseURL: 'https://www.googleapis.com',
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        
        const response = await googleApi.get('/oauth2/v2/userinfo');
        return response.ok && response.data ? response.data : null;
    };

    const handleSocialLogin = async (id: string, email: string): Promise<any> => {
        return await socialLogin({
            socialId: id,
            email: email
        });
    };

    const handleRegisterUser = async (email: string, name: string, id: string) => {
        return await registerUser({
            email: email,
            name: name,
            socialId: id,
            password: 'Chuaaaa'
        });
    };

    const handleCheckboxChange = () => {
        const value = getValues('staySignedIn');
        setValue('staySignedIn', !value);
    };

    const loginSocialGoogle = useGoogleLogin({
        onSuccess: (response) => handleLoginSuccess(response),
        onError: () => handleLoginFailure(),
    });

    const handleLoginSuccess = (response: any) => {
        console.log('Google login success', response);
        // const decodedToken = jwtDecode(response.access_token) as any;
        // console.log('decoded', decodedToken);
        setAccessToken(response.access_token);
    };
    
    const handleLoginFailure = () => {
        console.error('Google login failed');
        // Trate os erros de login aqui
    };

    return (
        <Container>
            <LoginConainter>
                <FormContainer onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid">
                        <div className="col-12">
                            <LogoContainer>
                                <img src={Logo1} />
                            </LogoContainer>
                        </div>
                        <div className="col-12">
                            <InputFloatingLabel 
                                label="Login" 
                                backgroundColor="#2e2e2e"
                                {...register('login')}
                            />

                        </div>
                        <div className="col-12">
                            <InputFloatingLabel 
                                label="Senha" 
                                backgroundColor="#2e2e2e"
                                type="password"
                                {...register('password')}
                            />
                        </div>
                        <div className="col-12">
                            <WrapperItens>
                                <SliderCheckbox 
                                    name="staySignedIn" 
                                    control={control}
                                    onChange={handleCheckboxChange} 
                                />
                                <p> Esqueceu sua senha? </p>
                            </WrapperItens>
                        </div>
                        <div className="col-12">
                            <Button padding=".5rem" backgroundColor="#1660c9" type="submit">
                                Entrar
                            </Button>
                        </div>
                        <Divider color="transparent" marginBottom=".2rem"/>
                        <div className="col-12">
                            <Button padding=".5rem" border="1px solid #0098ff" color="#0098ff" backgroundColor="transparent">
                                Registrar-se
                            </Button>
                        </div>
                        
                    </div>
                </FormContainer>
                <OauthContainer>
                    <div className="grid">
                        <div className="col-12">
                            <label> Ou se preferir </label>
                        </div>
                        <div className="col-12">
                            <Button padding=".5rem" backgroundColor="#fdfdfd" color="black" onClick={() => loginSocialGoogle()}>
                                <FcGoogle size={'1.5rem'}/>Login com Google
                            </Button>
                        </div>
                        <div className="col-12">
                            <Button padding=".5rem" backgroundColor="#575757">
                                <IoLogoDiscord size={'1.5rem'}/>Login com Discord
                            </Button>
                        </div>
                        <div className="col-12">
                            <Button padding=".5rem" backgroundColor="#e2e2e2" color="black">
                                <FaApple size={'1.5rem'}/>Login com Apple
                            </Button>
                        </div>
                    </div>
                </OauthContainer>
            </LoginConainter>
        </Container>
    )
}

export default Authentication;
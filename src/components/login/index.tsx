import React from "react"
import { UserCredential, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LoginButtons, LoginContainer, LoginForm, LoginInputs } from "./login.styled";

interface LoginProps {
    setUser: (user: UserCredential['user'] | null) => void
}

const Login = ({ setUser }: LoginProps ) => {

    const [ show, setShow ] = React.useState<boolean>(false)

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newForm = new FormData(e.target as HTMLFormElement)
        const email = newForm.get('email')
        const password = newForm.get('password')

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email as string, password as string)
        .then((userCredential) => {
            setUser(userCredential.user)            
        })
        .catch((error) => {
            console.log(error)
            setUser(null)
        })
    }

    const handleShow = () => setShow(!show)
    
    return (
        <LoginContainer>
            <button onClick={handleShow}>Login</button>
            {show && 
                <LoginForm onSubmit={login}>
                    <LoginInputs>
                        <input autoComplete="false" type="email" placeholder="Email" name="email" required />
                        <input autoComplete="false" type="password" placeholder="Password" name="password" required />
                    </LoginInputs>
                    <LoginButtons>
                        <button className='link' onClick={handleShow} >Cancelar</button>
                        <button type="submit">Entrar</button>
                    </LoginButtons>
                </LoginForm>
            }
        </LoginContainer>
    )
}

export default Login
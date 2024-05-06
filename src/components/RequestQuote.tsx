import React  from "react";
import { useFormik } from "formik";
import { Container, ButtonContainer, FieldBox, Modal, Title, Content, ErrorText } from "./RequestQuote.styled";
import yup from "common/yup";

const formFields = [
    {
        name: 'firstName',
        label: 'Nombre',
        type: 'text',
    },
    {
        name: 'lastName',
        label: 'Apellido',
        type: 'text',
    },
    {
        name: 'phone',
        label: 'Teléfono',
        type: 'number',
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
    },

]

const validationSchema = yup.object({
    firstName: yup.string().trim().required(),
    lastName: yup.string().trim().required(),
    phone: yup.string().trim().required(),
    email: yup.string().trim().email().required(),
})

interface RequestQuoteForm {
    [key: string]: string | undefined
    firstName: string | undefined
    lastName: string | undefined
    phone: string | undefined
    email: string | undefined
}

export const RequestQuote = () => {

    const formik = useFormik<Partial<RequestQuoteForm>>({
        initialValues: {},
        validationSchema: validationSchema,
        onSubmit: values => {
            const urlRef = new URL(window.location.href)
            urlRef.searchParams.append('firstName', values.firstName || '')
            urlRef.searchParams.append('lastName', values.lastName || '')
            urlRef.searchParams.append('phone', values.phone || '')
            urlRef.searchParams.append('email', values.email || '')
            window.history.pushState({}, '', urlRef.href);
        },
    });
    const [ open, setOpen ] = React.useState(false)

    const handleClick = () => {
        setOpen(true)
    }

    return (
        <Container>
            <button onClick={handleClick} >Solicitar presupuesto</button>
            {open && <Modal onClick={() => setOpen(false)}>
                <Content onClick={ e => e.stopPropagation()} >
                    <Title>Solicitar presupuesto</Title>
                    <form onSubmit={formik.handleSubmit} autoComplete='off' >

                        {formFields.map( field => (
                            <FieldBox key={field.name}>
                                <label htmlFor={field.name}>{field.label}</label>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    onChange={formik.handleChange}
                                    value={formik.values[field.name]}
                                />
                                {formik.touched[field.name] && formik.errors[field.name]
                                    ? <ErrorText>{formik.errors[field.name]}</ErrorText>
                                    : <></>
                                }
                            </FieldBox>
                        ))}

                        <ButtonContainer>
                            <button className='link' onClick={() => setOpen(false) } >Cancelar</button>
                            <button className='primary' type='submit'>Enviar</button>
                        </ButtonContainer>
                    </form>
                </Content>
            </Modal>}
        </Container>
    )
}
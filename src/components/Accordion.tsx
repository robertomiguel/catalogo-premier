import React from 'react'
import { Card, Container, Content, Label } from './Accordion.styled'

interface Options {
    label: string
    content: any
}

interface AccordionProps {
    options: Options[]
}

export const Accordion = ({ options }: AccordionProps) => {
    const [ activeIndex, setActiveIndex ] = React.useState<number | null>(0)

    const handleClick = ( idx: number) => {
        setActiveIndex(idx === activeIndex ? null : idx)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return <Container>
        {options.map((option, index) => {
            return <Card key={`accordion-${index}-${option.label}`}>
                <Label onClick={() => handleClick(index)} >{option.label}</Label>
                {activeIndex === index && <Content>{option.content}</Content>}
            </Card>
        })}
    </Container>
}

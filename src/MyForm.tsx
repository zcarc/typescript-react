import React, {useRef, useState} from 'react'

type MyFormProps = {
    onSubmit: (form: { name: string; description: string }) => void
}

function MyForm({onSubmit}: MyFormProps) {

    const inputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        name: '',
        description: ''
    })

    const { name, description } = form

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        onSubmit(form)

        setForm({
            name: '',
            description: ''
        })

        console.log('inputRef.current: ', inputRef.current)
        console.log('!inputRef.current: ', !inputRef.current)

        // current가 false인 값(null or undefined)이라면 true로 만들고 종료
        if(!inputRef.current) {
            return
        }

        inputRef.current.focus()
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={name} onChange={onChange} ref={inputRef}/>
            <input name="description" value={description} onChange={onChange}/>
            <button type="submit">등록</button>
        </form>
    )

}

export default MyForm
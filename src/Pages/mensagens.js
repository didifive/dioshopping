import { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';
import validator from 'validator';

const Mensagens = () => {

    const url = 'https://api-dioshopping-didi.herokuapp.com/message/'

    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [authorEmail, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [validatorForm, setValidator] = useState(false);
    const [render, setRender] = useState(false);
    const [success, setSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url)
            const data = await response.json();
            setMessage(data);
        }
        fetchData();
    }, [render])

    const sendMessage = () => {
        setValidator(false);
        setRender(false);
        if(author.length <= 0 || !validator.isEmail(authorEmail) || content.length <= 0){
            return setValidator(!validatorForm)
        }
        const bodyForm = {
            name: author,
            email: authorEmail,
            message: content,
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyForm)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.id) {
                setRender(true);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 6500)
            }
        })
        
        setAuthor('');
        setEmail('');
        setContent('');
    }  


    const deleteMessage = (id) => {
        setRender(false);
        const deleteURL = url + "delete/" + id;
        fetch(deleteURL, {
            method: "DELETE",
        })
        .then(() => {
            setRender(true);
            setDeleteSuccess(true);
            setTimeout(() => {
                setDeleteSuccess(false);
            }, 6500)
        })
    }  

    return(
        <>
            <h2>
                Deixe aqui o seu depoimento
            </h2>
            <Grid container direction="row" xs={12}>
                <TextField id="name" label="Name" value={author} onChange={(event)=>{setAuthor(event.target.value)}} fullWidth/>
                <TextField id="email" label="Email" value={authorEmail} onChange={(event)=>{setEmail(event.target.value)}} fullWidth/>
                <TextField id="message" label="Message" value={content} onChange={(event)=>{setContent(event.target.value)}} fullWidth/>
            </Grid>

            {validatorForm && 
                <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    <strong>Por favor preencha corretamente todos os campos!</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            {success && 
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Seu depoimento foi enviado!</strong>
                </div>
            }

            <Button onClick={sendMessage} className="mt-2" variant="contained" color="primary">
                Enviar Depoimento
            </Button>

            <br />
            <br />

            <hr />

            <h3>
                Nossos depoimentos:
            </h3>

            {message.map((content) => {
                return(
                    <div className="card mt-2" key={content.id}>
                        <div className="card-body">
                            <h5 className="card-title">{content.name}</h5>
                            <p className="card-text">{content.email}</p>
                            <p className="card-text">{content.message}</p>
                            <p className="card-text"><small className="text-muted">{content.created_at}</small></p>
                            <Button 
                                className="mt-2"
                                variant="contained"
                                color="secondary"
                                onClick={() => deleteMessage(content.id)}
                            >
                                APAGAR DEPOIMENTO
                            </Button>
                        </div>
                    </div>
                )
            })}

            {deleteSuccess && 
                <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                    <strong>O depoimento foi apagado.</strong>
                </div>
            }

        </>
    )
}

export default Mensagens;

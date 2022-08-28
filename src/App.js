//SOURCE : https://www.cril.univ-artois.fr/~boussemart/react/chapter01.html
import './App.css';
import { useState } from 'react';

//import de socket
import { io } from 'socket.io-client';

function App() {
  //Hook des messages
  const [messages, setMessages] = useState([]);

  //connexion au serveur socket.io
  const socket = io('localhost:8000');
  socket.on('SERVER_MSG', msg => {
    setNouveauMessage(msg);
  })
  //Etat du hook message = cette fonction change l'etat de la variable messages et creer un nouveau tableau qui ajoute le message entrer
  function setNouveauMessage(msg){
    //le mutateur du hook
    setMessages([
      //On eclate le tableau
      ...messages,
      //le paramètres de la fonction
      msg
    ])
  }

  //Cette fonction prend en parametre un event et la validation du formulaire
  function envoyerMessage(e){
    e.preventDefault();
    const msg = {
      username: e.target.username.value,
      text: e.target.text.value
    };
    //emit socket
    socket.emit('CLIENT_MSG', msg);
    //le mutateur
    setNouveauMessage(msg);
  }

  return (
    <div className="App">
      <div className='container d-flex justify-content-center mt-5'>   
          <div className='w-50 shadow p-3'>
            <div className='card'>
              <div className='card-body'>
                <div className='card-title text-success'>CHAT AVEC REACT</div>
                <hr/>
                <div className='messages'>
                  {messages.map((msg, index) => {
                    return(
                      <div key={index}><b className='text-danger'>{msg.username} a ècrit :</b> {msg.text}</div>
                    )
                  })}
                </div>
              </div>

              <form onSubmit={e => envoyerMessage(e)}>
                <div className='card-footer'>
                  <input 
                    id='username'
                    type='text'
                    placeholder='Pseudo'
                    className='form-control'
                    />
                    <br />
                    <input 
                    id='text'
                    type='text'
                    placeholder='Votre message'
                    className='form-control'
                    />
                    <br />
                    <button type='submit' className='btn btn-info'>Envoyer</button>
                </div>
              </form>

            </div>
          </div>
       
      </div>
    </div>
  );
}

export default App;

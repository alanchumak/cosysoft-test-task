import React from 'react'
import styles from './JokeModalForm.module.css'
import jokeStyles from '../../JokeList/Joke.module.css'
import Joke from '../../features/jokes/Joke'
import Modal from 'react-modal'


interface JokeModalFormProps {
    joke: Joke,
    open: boolean,
    onClose: () => void
}


const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }
};


export const JokeModalForm = ({ joke, open = false, onClose }: JokeModalFormProps) => {
    return (
        <Modal
            isOpen={open}
            onRequestClose={onClose}
            closeTimeoutMS={300}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <button className={styles.button} onClick={onClose}>
                ×
            </button>

            <div className={styles.jokeModalFormContent} >
                <div className={jokeStyles.text}>
                    <div>
                        <span className={jokeStyles.setup}>Setup:</span> {joke.setup}
                    </div>
                    <div>
                        <span className={jokeStyles.punchline}>Punchline:</span> {joke.punchline}
                    </div>
                </div>
            </div>
        </Modal>
    )
}
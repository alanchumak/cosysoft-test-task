import React, { useState } from 'react'
import styles from './ReadingList.module.css'
import { jokeRemovedFromReadingList } from '../features/jokes/jokesSlice'
import {  useAppDispatch } from '../app/hooks'
import { BookmarkIcon } from './BookmarkIcon'
import jokeStyles from '../JokeList/Joke.module.css'
import Joke from '../features/jokes/Joke'
import Modal from 'react-modal'


// import Rodal from 'rodal';
// const Rodal = require('rodal');
// import 'rodal/lib/rodal.css';
// require('rodal/lib/rodal.css')


interface JokeModalFormProps{
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


const JokeModalForm = ({ joke, open = false, onClose }: JokeModalFormProps) => {
    return(
        <Modal 
            isOpen={open} 
            onRequestClose={onClose}
            closeTimeoutMS={300}
            style={customStyles}
            contentLabel="Example Modal"
        >

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


interface ListItemProps{
    joke: Joke
}

export const ListItem = ({ joke }: ListItemProps) => {
    let content = `Setup: ${joke.setup} Punchline: ${joke.punchline}`
    const [showJoke, setShowJoke] = useState(false)

    return (
        <div>
            <div
                className={styles.listItem}
                onClick={() => setShowJoke(true)}
            >
                <BookmarkIcon />
                <div className={styles.text}>
                    {content}
                    <div className={styles.timeAgo}>Добавлено 5 мин назад</div>
                </div>
                <DeleteButton jokeId={joke.id} />
            </div>
            <JokeModalForm joke={joke} open={showJoke} onClose={() => setShowJoke(false)}/>
        </div >
    )
}


interface DeleteButtonProps{
    jokeId: number
}

const DeleteButton = ({ jokeId }: DeleteButtonProps) => {
    const dispatch = useAppDispatch()
    return (
        <div
            className={styles.deleteBtn}
            title='Удалить из списка'
            onClick={() => dispatch(jokeRemovedFromReadingList(jokeId))}
        >
            ×
        </div>
    )
}
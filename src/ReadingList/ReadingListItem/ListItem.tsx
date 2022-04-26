import React, { useState } from 'react'
import styles from './ListItem.module.css'
import { jokeRemovedFromReadingList } from '../../features/jokes/jokesSlice'
import {  useAppDispatch } from '../../app/hooks'
import { BookmarkIcon } from './BookmarkIcon'
import Joke from '../../features/jokes/Joke'
import {JokeModalForm} from './JokeModalForm'

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
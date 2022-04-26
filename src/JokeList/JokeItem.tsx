import React from 'react'
import styles from './Joke.module.css'
import { jokeSavedToReadingList } from '../features/jokes/jokesSlice'
import Joke from '../features/jokes/Joke'
import { selectTenJokes } from '../features/jokes/jokesSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks'


interface IJokeItemProps {
    joke: Joke
}

export const JokeItem = ({ joke }: IJokeItemProps) => {
    return (
        <div className={styles.joke}>
            <div className={styles.text}>
                <div>
                    <span className={styles.setup}>Setup:</span> {joke.setup}
                </div>
                <div>
                    <span className={styles.punchline}>Punchline:</span> {joke.punchline}
                </div>
            </div>
            <SaveButton jokeId={joke.id} />
        </div>
    )
}


interface ISaveButtonProps {
    jokeId: number
}

const SaveButton = ({ jokeId }: ISaveButtonProps) => {
    const dispatch = useAppDispatch()

    return (
        <div
            className={styles.addBtn}
            title='Добавить в мой список'
            onClick={() => dispatch(jokeSavedToReadingList(jokeId)) }
        >
            +
        </div>
    )
}
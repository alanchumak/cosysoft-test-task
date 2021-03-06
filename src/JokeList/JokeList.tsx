import React, { useEffect } from 'react'
import styles from './JokeList.module.css'
import { selectTenJokes, fetchJokes } from '../features/jokes/jokesSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { JokeItem } from './JokeItem/JokeItem'
import Joke from '../features/jokes/Joke'


export const JokeList = () => {
    const dispatch = useAppDispatch()
    const jokes: Array<Joke> = useAppSelector(selectTenJokes)
    const jokesStatus: string = useAppSelector(state => state.jokes.status)

    useEffect(() => {
        if (jokesStatus == 'idle')
            dispatch(fetchJokes())
    },
        [jokesStatus, dispatch])

    const onClicked =  () => {
        dispatch(fetchJokes())
    }    
    const content = jokes.map(item => <JokeItem key={item.id} joke={item} />)
    // const content = Object.keys(jokes).map(id => <Joke key={id} joke={jokes[id]} />)

    return(
        <div className={styles.jokeList}>
            <button className={styles.newJokesButton} onClick={onClicked}>
                Получить 10 новых шуток
            </button>
            {content}
            
        </div>
    )
}
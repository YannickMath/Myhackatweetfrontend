import styles from '../styles/tweetComment.module.css'

export default function tweetComment(props) {
const setModal = props.setModal

    const handleCloseComment = () => {
        setModal(false)
    }
    return (
        <div className={styles.main}>
            HELLO
            <p style={{cursor: "pointer"}} onClick={handleCloseComment}>x</p>
        </div>
    )
}
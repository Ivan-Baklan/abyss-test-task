import { ScalePanel } from "../Components";
import { CursorIcon } from "../icons/Icons";
import styles from './Navbar.module.css'

interface NavbarProps {
    treeViewRef: React.RefObject<HTMLUListElement>
}

export default function Navbar({ treeViewRef }: NavbarProps) {

    const placeListCenter = () => {


        const treeList = treeViewRef.current as HTMLUListElement
        const parentEllement = treeViewRef.current?.parentElement as HTMLDivElement
        treeList.style.left = `${parentEllement.clientWidth / 2 - treeList.clientWidth / 2}px`
        treeList.style.top = `${parentEllement.clientHeight / 2 - treeList.clientHeight / 2}px`


    }

    return (
        <header className={styles.navigationContent}>
            <h2>Services <span className={styles.countBadge__yellow}>0</span></h2>
            <div className={styles.navigationContent_buttons}>
                <button type='button' className={styles.listview_button}>LIST VIEW</button>
                <button
                    type='button'
                    className={styles.centering_button}
                    onClick={placeListCenter}
                >
                    <CursorIcon width={20} height={20} fill={"#B8BFC1"} />
                    <span className={styles.gotocenter_tooltip}>Go to center</span>
                </button>

                <ScalePanel treeViewRef={treeViewRef} />
            </div>
            <div className={styles.horizontalBottomLine} />
        </header>
    )
}